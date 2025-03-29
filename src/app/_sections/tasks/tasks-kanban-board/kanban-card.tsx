import { Calendar, Paperclip, Users } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { Priority } from '@/app/_components/priority'
import { CardContent } from './kanban-card-content'
import { ActiveState, ITask } from '@/app/types/kanban'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Tooltip } from '@/app/_components/tooltip'

type KanbanCardProps = {
  item: ITask
  id: string
  active?: ActiveState
  columnId: string
  isOverlay?: boolean
  handleOpenSheet?: () => void
}

export function KanbanCard({ handleOpenSheet = () => {}, item, id, active, columnId }: KanbanCardProps) {
  const { title, priority, description, dueDate, attachments, collaborators } = item

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'item', columnId },
  })
  const formattedDate = dayjs(dueDate).format('MMM DD')
  const isRed = isPastDueDate(dueDate)

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
        </div>
        <CardContent title={title} description={description} />
  
        <div className="mt-1 flex items-center gap-2">
          <Tooltip title="Due date">
            <div className="flex items-center gap-1">
              <Calendar className="text-gray-500" size={15} />
              <p className={cn('text-xs text-red-600', isRed ? 'text-red-600' : 'text-black')}>{formattedDate}</p>
            </div>
          </Tooltip>

          {attachments.length > 0 && (
            <Tooltip title="tasks attachments">
              <div className="flex items-center gap-1">
                <Paperclip className="text-gray-500" size={15} />
                <span className="text-xs">{attachments.length ?? 0}</span>
              </div>
            </Tooltip>
          )}
          {collaborators.length > 0 && (
            <Tooltip title="Task collaborators">
              <div className="flex items-center gap-1">
                <Users className="text-gray-500" size={15} />
                <span className="text-xs">{collaborators.length ?? 0}</span>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

const isPastDueDate = (dueDate: string) => {
  const today = dayjs()
  const date = dayjs(dueDate)
  return date.isBefore(today)
}

type TooltipWrapperProps = {
  children: ReactNode
  tooltipText: string
}
// export function ToolTipWrapper({ children, tooltipText }: TooltipWrapperProps) {
//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>{children}</TooltipTrigger>
//       <TooltipContent>
//         <p>{tooltipText}</p>
//       </TooltipContent>
//     </Tooltip>
//   )
// }