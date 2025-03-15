import { Eye } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { Priority } from '@/app/_components/priority'
import { CardContent } from './kanban-card-content'

import { Button } from '@/components/ui/button'
import { ActiveState, Task } from '@/app/types/kanban'

type KanbanCardProps = {
  item: Task
  id: string
  active?: ActiveState
  columnId: string
  isOverlay?: boolean
  handleOpenSheet?: () => void
}

export function KanbanCard({ handleOpenSheet = () => {}, item, id, active, columnId }: KanbanCardProps) {
  const { title, priority, description, contributors } = item
  console.log({ contributors })
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'item', columnId },
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging && active?.type === 'item' ? 0.4 : 1,
  }

  return (
    <div
      className="flex w-full cursor-grab select-none flex-col justify-between rounded-lg border border-border bg-popover"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
      }}
    >
      <div className="p-2.5" style={{ borderBottomColor: '#222222' }}>
        <div className="flex flex-row items-center justify-between">
          {/* Top bar: drag and drop / menu */}
          <Priority status={priority} />
          <Button onClick={handleOpenSheet} variant="ghost" className="h-6 w-6">
            <Eye size={18} className="text-muted-foreground" />
          </Button>
        </div>
        <CardContent title={title} description={description} />
      </div>
    </div>
  )
}
