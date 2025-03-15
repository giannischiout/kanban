import { Button } from '@/app/_components/buttons'
import { ReactNode } from 'react'
import { Check, ChevronDown, CirclePlus, Clock, Ellipsis, NotebookPen, Search, Video } from 'lucide-react'

export function MainNav() {
  return (
    <nav className="flex h-[40px] flex-row bg-primary">
      <div className="flex w-56 items-center px-4">
        <span className="text-md font-black text-white">
          Workzen
          <span className="ml-[0.2px] text-lg text-secondary">.</span>
        </span>
      </div>
      <div className="flex flex-1 flex-row items-center justify-end gap-1 px-4">
        <span className="mr-2 flex h-[75%] min-w-40 cursor-pointer items-center gap-2 rounded-md bg-white/20 px-2 text-xs text-white/70 backdrop-blur-md">
          <Search size={14} />
          Search...
        </span>
        <span className="h-[50%] w-[1px] bg-white/20"></span>
        <Button
          className="text-white hover:bg-white/10 hover:text-white hover:backdrop-blur-md"
          tooltipText="Create items "
          size="sm"
          variant="ghost"
        >
          <CirclePlus />
          New
        </Button>
        <span className="h-[50%] w-[1px] bg-white/20"></span>
        <GlassHoverButton>
          <Check />
        </GlassHoverButton>
        <GlassHoverButton>
          <NotebookPen />
        </GlassHoverButton>
        <GlassHoverButton>
          <Video />
        </GlassHoverButton>
        <GlassHoverButton>
          <Clock />
        </GlassHoverButton>
        <GlassHoverButton>
          <Ellipsis />
        </GlassHoverButton>
        <div className="flex h-[80%] items-center justify-between gap-1 rounded border-border bg-white/10 px-1 backdrop-blur-md">
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white">
            <span className="mt-0.5 text-[12px]">G</span>
            <span className="bottom5 absolute bottom-0 right-0 h-[6px] w-[6px] rounded-full border border-black bg-green-500 shadow-sm" />
          </div>
          <ChevronDown size={15} className="text-white" />
        </div>
      </div>
    </nav>
  )
}

type GlassHoverButtonProps = {
  children: ReactNode
}

export function GlassHoverButton({ children }: GlassHoverButtonProps) {
  return (
    <Button
      size="icon-sm"
      className="relative overflow-hidden rounded-lg px-4 py-2 font-semibold text-white transition duration-300 hover:bg-white/10 hover:backdrop-blur-md"
    >
      {children}
    </Button>
  )
}