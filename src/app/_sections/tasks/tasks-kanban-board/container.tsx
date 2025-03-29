import { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { UniqueIdentifier } from '@dnd-kit/core'
import { IColumn } from '@/app/types/kanban'

type ContainerProps = {
  children: ReactNode
  column: IColumn
  id: UniqueIdentifier
}
export function Container({ children, column, id }: ContainerProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'column', columnId: id },
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="w-[280px] cursor-grab rounded-md bg-accent/70">
      <div className="flex items-center justify-between rounded-md border border-border p-3" style={{ backgroundColor: 'white' }}>
        <div className="flex items-center justify-center gap-2">
          <Bullet color={column.color} />
          <span className="text-center">{column.name}</span>
          <span className="text-muted-foreground">{column.taskIds.length}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-2">{children}</div>
    </div>
  )
}

export function Bullet({ color: backgroundColor }: { color: string }) {
  return <div className="h-[8px] w-[8px] rounded-full" style={{ backgroundColor }} />
}
