import { Lock } from 'lucide-react'
import { Button } from '@/app/_components/buttons'

export function TaskVisibility() {
  return (
    <div style={{ backgroundColor: '#1b1b1b' }} className="bg-surface flex items-center justify-between px-6 py-2">
      {/* task status text */}
      <div className="flex items-center gap-2">
        <Lock className="text-muted-foreground" size={14} />
        <p className="select-none text-sm">This task is private to you</p>
      </div>
      {/* {visibility action} */}
      <Button className="hover:bg-surface-600/50" tooltipText="Allow everyone your company to see it" variant="ghost" text="muted">
        Make Public
      </Button>
    </div>
  )
}
