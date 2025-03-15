import { Button } from '@/components/ui/button'
import { Hourglass, MessageCircle, PanelRightOpen, Star } from 'lucide-react'
import { useSidebar } from '@/app/_context/sidebar-context'
import { usePathname } from 'next/navigation'
import { useGetProject } from '@/app/_actions/project'
import { ShareDialog } from '@/app/_layouts/tasks/nav/nav-popovers/share-dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useBoolean } from '@/hooks/use-boolean'
import { Project } from '@/app/types/project'
import React, { useRef } from 'react'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/app/utils/format-date'

export function SecondaryNav() {
  const { openSidebar, isSidebarOpen } = useSidebar()
  const pathname = usePathname()
  const slug = pathname.split('/')[2]
  const { project } = useGetProject(slug)
  console.log({ project })
  return (
    <div className="flex h-12 w-full items-center border-b border-border px-2">
      <div className="flex flex-1 items-center justify-between">
        {!isSidebarOpen && (
          <Button
            onClick={openSidebar}
            className="h-5 w-5 items-center transition-all duration-200 ease-in-out hover:bg-background group-hover:flex"
            variant="ghost"
            size="icon"
          >
            <PanelRightOpen className="text-muted-foreground" />
          </Button>
        )}
        {/* project details */}
        <ProjectPopover project={project} />
      </div>
      <div className="flex gap-1">
        <ShareDialog />
        <Button size="sm" variant="outline">
          <MessageCircle />
          Comment
        </Button>
      </div>
    </div>
  )
}

export function ProjectPopover({ project }: { project: Project | null }) {
  const { value, onFalse, onTrue } = useBoolean()
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const { color, name, endDate, description } = project ?? {}

  const handleClick = () => {
    onTrue()
  }
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (popoverRef.current && !popoverRef.current.contains(event.relatedTarget as Node)) {
      onFalse()
    }
  }

  const handleMouseEnter = () => {
    setTimeout(() => {
      onTrue()
    }, 300)
  }
  return (
    <Popover open={value}>
      <PopoverTrigger>
        <div
          ref={popoverRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex cursor-pointer items-center gap-1 px-2 text-sm font-medium"
        >
          <span className="h-4 w-4 rounded-md" style={{ backgroundColor: color }} />
          <span className="max-w-[25ch] truncate text-ellipsis text-gray-700">{name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">{name}</span>
            <Star size={14} />
          </div>
          <p className="mt-0.5 text-sm text-gray-700">{description}</p>
          <Separator className="my-3" />
          <div className="flex flex-col gap-4">
            {/* project owner */}
            <div className="grid grid-cols-[100px_1fr] items-center">
              <span className="font-medium text-muted-light">Owner</span>
              <div className="flex items-center gap-1.5 text-sm">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  {name?.charAt(0)?.toUpperCase()}
                </div>
                Tom Wilson
              </div>
            </div>
            {/* created by */}
            <div className="grid grid-cols-[100px_1fr] items-center">
              <span className="font-medium text-muted-light">Created by</span>
              <div className="flex items-center gap-1.5 text-sm">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  {name?.charAt(0)?.toUpperCase()}
                </div>
                Giannis Chioutakos
              </div>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex items-center gap-0.5 text-xs text-muted-light">
            <Hourglass size={12} />
            <span>{formatDate(endDate)}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}