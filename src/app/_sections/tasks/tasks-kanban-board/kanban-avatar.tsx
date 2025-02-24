import { Tooltip } from '@/app/_components/tooltip'
import { cn } from '@/lib/utils'

type Props = {
  initials: string
  contributor: string
  color: string
}
export function KanbanAvatar({ initials, contributor, color }: Props) {
  return (
    <Tooltip title={contributor}>
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full shadow-[12px_0_10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:ring-2 hover:ring-primary"
        style={{ backgroundColor: color }}
      >
        <span className="text-xs">{initials}</span>
      </div>
    </Tooltip>
  )
}
export function Avatar({ initials, color, size }: { initials: string; color: string; size?: string }) {
  return (
    <div
      className={cn('flex h-6 w-6 items-center justify-center rounded-full text-amber-50 transition-all duration-300 hover:ring-2 hover:ring-primary', size === 'md' ? 'h-8 w-8' : 'h-6 w-6')}
      style={{ backgroundColor: color }}
    >
      <span className="z-10 text-xs">{initials}</span>
    </div>
  )
}
