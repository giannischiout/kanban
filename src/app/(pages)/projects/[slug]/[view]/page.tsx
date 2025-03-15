'use client'
import { usePathname } from 'next/navigation'
import { KanbanBoard } from '@/app/_sections/tasks/tasks-kanban-board/_index'

export default function Page() {
  const pathname = usePathname()
  const view = pathname.split('/')[3]
  if (view === 'board') {
    return (
      <div className="h-full p-4">
        <KanbanBoard />
      </div>
    )
  }
  if (view === 'list') {
    return <div className="p-2">list</div>
  }
  // return <KanbanBoard />
}
