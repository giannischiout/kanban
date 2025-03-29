'use client'

import { ActiveState, Column, KanbanState } from '@/app/types/kanban'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { usePopover } from '@/hooks/usePopover'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SmartPointerSensor } from '@/app/_sections/tasks/tasks-kanban-board/smart-pointer'
import { arrayMove, horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Container } from '@/app/_sections/tasks/tasks-kanban-board/container'
import { Button } from '@/components/ui/button'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { INITIAL_KANBAN_STATE, useGetTasks } from '@/app/_actions/tasks'
import { usePathname } from 'next/navigation'
import { KanbanCard } from '@/app/_sections/tasks/tasks-kanban-board/kanban-card'

export function KanbanBoard() {
  const pathname = usePathname()
  const slug = pathname.split('/')[2]
  const { project } = useGetTasks(slug)
  //
  console.log({ project })
  const [kanban, setKanban] = useState<KanbanState>(INITIAL_KANBAN_STATE)
  const sheet = usePopover()
  const [active, setActive] = useState<ActiveState>({
    id: '',
    type: '',
    columnId: '',
  })
  const sensors = useSensors(useSensor(SmartPointerSensor))

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { id } = event.active
    const type = event?.active?.data?.current?.type
    const columnId = event?.active?.data?.current?.columnId

    setActive((prev) => ({ ...prev, id, type, columnId: columnId ?? '' }))
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over?.id || active.id === over.id) return
      //
      const activeType = active?.data?.current?.type
      const overType = over?.data?.current?.type
      const actionType = getType(activeType, overType)

      if (actionType === 'isColumn') {
        const oldIndex = kanban.columnOrder.indexOf(active.id as string)
        const newIndex = kanban.columnOrder.indexOf(over?.id as string)

        const newOrder = arrayMove(kanban.columnOrder, oldIndex, newIndex)
        setKanban((prev) => ({ ...prev, columnOrder: newOrder }))
      }
      if (actionType === 'isItem') {
        // get columns:
        const activeColumn = active?.data.current?.columnId
        const activeTasks = kanban.columns[activeColumn].taskIds
        // get item indexes:
        const activeIndex = findItemIndex(activeTasks, active?.id)
        const overIndex = findItemIndex(activeTasks, over?.id)
        // use dnd-kit helper function to reorder array:
        const newArray = arrayMove(activeTasks, activeIndex, overIndex)
        // update the new state:
        setKanban((prev) => {
          return {
            ...prev,
            columns: {
              ...prev.columns,
              [activeColumn]: {
                ...prev.columns[activeColumn],
                taskIds: newArray,
              },
            },
          }
        })
      }
    },
    [kanban]
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      const activeColumnId = active.data?.current?.columnId
      const overColumnId = over?.data?.current?.columnId
      const activeType = active.data?.current?.type

      if (!overColumnId) return
      if (activeType === 'item' && activeColumnId !== overColumnId) {
        const updatedActive = kanban.columns[activeColumnId].taskIds.filter((taskId) => taskId !== active.id)
        const updatedOver = [...kanban.columns[overColumnId].taskIds]
        const overIndex = updatedOver.findIndex((taskId) => taskId === over?.id)
        if (overIndex === -1) {
          updatedOver.push(active.id.toString())
        } else {
          updatedOver.splice(overIndex, 0, active.id.toString())
        }

        setKanban((prev) => ({
          ...prev,
          columns: {
            ...prev.columns,
            [activeColumnId]: {
              ...prev.columns[activeColumnId],
              taskIds: updatedActive,
            },
            [overColumnId]: {
              ...prev.columns[overColumnId],
              taskIds: updatedOver,
            },
          },
        }))
      }
    },
    [kanban.columns]
  )
  const modifiers = useMemo(() => getModifiers(active?.type), [active?.type])

  const handleOpenSheet = (newTaskId: string) => {
    sheet.onOpen()
    // setViewTaskId(newTaskId)
  }

  return (
    <section className="h-full">
      <DndContext
        id="dnd-kanban"
        modifiers={modifiers}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <SortableContext items={kanban.columnOrder} strategy={horizontalListSortingStrategy}>
          <div className="flex min-h-full flex-row gap-4 overflow-hidden overflow-x-auto">
            {project?.columns?.map((column) => {
              return (
                <Container key={column._id} column={column} id={column._id}>
                  <SortableContext items={column?.taskIds || []} strategy={verticalListSortingStrategy}>
                    {column?.tasks &&
                      column?.tasks.map((task) => (
                        <KanbanCard
                          key={task._id}
                          handleOpenSheet={() => handleOpenSheet(task._id)}
                          active={active}
                          id={task._id}
                          columnId={column._id}
                          item={task}
                        />
                      ))}
                  </SortableContext>
                </Container>
              )
            })}
            {/*<AddColumnDialog onColumnAdd={onColumnAdd} />*/}
          </div>
        </SortableContext>
        {/*YA*/}
      </DndContext>
      {/*<TaskViewSheet taskId={viewTaskId} open={sheet.open} onClose={sheet.onClose}/>*/}
    </section>
  )
}

type GhostButtonProps = {
  children: ReactNode
}

export function GhostButton({ children }: GhostButtonProps) {
  return (
    <Button className="px-2 tracking-wide text-muted hover:bg-card" variant="ghost">
      {children}
    </Button>
  )
}

// helper functions:
const getType = (activeType?: string, overType?: string): string | undefined => {
  if (activeType === 'item' && overType === 'item') return 'isItem'
  if (activeType === 'column' && overType === 'column') return 'isColumn'
  return undefined
}

const getModifiers = (type: string | null) => {
  if (type === 'column') {
    return [restrictToHorizontalAxis] // Restrict movement to horizontal axis for columns
  } else {
    return [] // No restrictions, allowing free movement for kanban cards
  }
}

const findItemIndex = (array: Column['taskIds'], key: UniqueIdentifier) => {
  return array.findIndex((itemId) => itemId === key.toString())
}
