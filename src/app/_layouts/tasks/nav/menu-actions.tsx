import { Button } from '@/components/ui/button'
import { List, Plus, SquareKanban } from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'

export function MenuActions() {
  const { slug, view } = useParams()
  const router = useRouter()
  const handleActive = (newView: string) => {
    router.push(`/projects/${slug}/${newView}`)
  }
  return (
    <div className="flex h-12 cursor-pointer select-none items-center justify-between border-b border-border px-2">
      <div className="flex h-full items-center gap-4 pl-2">
        <CustomTab active={view === 'board'} handleActive={() => handleActive('board')}>
          <SquareKanban size={14} />
          Board
        </CustomTab>{' '}
        <CustomTab active={view === 'list'} handleActive={() => handleActive('list')}>
          <List size={14} />
          List
        </CustomTab>
      </div>
      <Button className="ml-3 h-7 rounded-md text-xs [&_svg]:size-3">
        <Plus />
        add task
      </Button>
    </div>
  )
}

type CustomTabProps = {
  active: boolean
  handleActive: () => void
  children: ReactNode
}
export function CustomTab({ active, handleActive, children }: CustomTabProps) {
  return (
    <div
      onClick={handleActive}
      className={cn(
        'relative flex h-full items-center font-medium text-gray-500 transition-all duration-300 before:scale-x-0 [&_svg]:size-3.5',
        active &&
          "text-black before:absolute before:-bottom-0.5 before:h-0.5 before:w-[110%] before:origin-center before:scale-x-100 before:bg-primary before:transition-all before:duration-300 before:content-['']"
      )}
    >
      <div className="flex items-center gap-1 text-sm">{children}</div>
    </div>
  )
}