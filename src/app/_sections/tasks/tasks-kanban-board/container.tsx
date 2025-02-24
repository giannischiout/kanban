import { ReactNode } from 'react'
import { Column } from '@/app/types/kanban'
import { Plus } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { UniqueIdentifier } from '@dnd-kit/core'

type ContainerProps = {
  children: ReactNode
  column: Column
  id: UniqueIdentifier
}
export function Container({ children, column, id }: ContainerProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, data: { type: 'column', columnId: id } })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="bg-background-light h-full min-w-[320px] max-w-[360px] flex-1 cursor-grab rounded-md shadow-xl">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center justify-center gap-2">
          <Bullet color={column.color} />
          <span className="text-center">{column.title}</span>
          <span className="text-muted-foreground">{column.taskIds.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="light">
            <Plus className="text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3">{children}</div>
    </div>
  )
}

export function Bullet({ color: backgroundColor }: { color: string }) {
  return <div className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor }} />
}

export const getTitle = (title: string) => {
  if (!title) return ''
  return title?.charAt(0)?.toUpperCase() + title?.slice(1)
}
