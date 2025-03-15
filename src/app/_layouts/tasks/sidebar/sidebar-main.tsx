'use client'

import { ReactNode } from 'react'
import { ChevronDown, Ellipsis, House, Mail, Plus, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipButton } from '@/app/_components/buttons/tooltip-button'
import { GetProjects } from '@/app/_layouts/tasks/sidebar/components/sidebar-get-projects'
import { UserProfile } from '@/app/_layouts/tasks/sidebar/components/sidebar-profile'
import { Favorites } from '@/app/_layouts/tasks/sidebar/components/sidebar-favorites'
import { Employee } from '@/app/types/employee'
import { Project } from '@/app/types/project'

// To make all items align correctly total padding combined should be p-4 same applies for the vertical padding:
// menu items have padding themselves. px-2 py-1
type SidebarProps = {
  user: Employee | null
  projects: Project[]
}
export function SidebarMain({ user, projects }: SidebarProps) {
  return (
    <aside className="group flex max-w-72 select-none flex-col border-r border-border duration-1000 ease-in">
      <div className="flex-1 overflow-y-auto">
        {/* and sidebar close action */}
        <UserProfile user={user} />
        <div className="flex flex-col gap-1 border-b border-border px-2 py-2">
          <MenuItem>
            <House className="text-muted-foreground" size={15} />
            Home
          </MenuItem>
          <MenuItem>
            <Mail className="text-muted-foreground" size={15} />
            Inbox
          </MenuItem>
          <MenuItem>
            <Ellipsis className="text-muted-foreground" size={15} />
            More
          </MenuItem>
        </div>
        <Favorites />
        {/* Projects */}
        <div className="mb-2 overflow-scroll px-2 py-4">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex cursor-pointer items-center gap-1 rounded p-1 px-2">
              <ChevronDown className="text-muted-foreground" size={15} />
              <span className="font-medium">Projects</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon-sm">
                <Ellipsis />
              </Button>
              <TooltipButton variant="ghost" size="icon-sm" tooltipText="Search existing projects">
                <Search />
              </TooltipButton>
              <TooltipButton size="icon-xs" tooltipText="Add a new project">
                <Plus />
              </TooltipButton>
            </div>
          </div>
          {/* project list */}
          <GetProjects projects={projects} />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-border p-4">
        <Button className="to-primary-gradient flex items-center gap-2 rounded-md bg-gradient-to-r from-primary px-4 py-2 text-white hover:opacity-90">
          <Zap className="h-5 w-5" />
          Upgrade
        </Button>
        <Button variant="outline">
          <Mail />
          Invite Teammates
        </Button>
      </div>
    </aside>
  )
}

export const MenuItem = ({ children }: { children: ReactNode }) => {
  return (
    <a className="transform-background-color flex h-8 cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-2 py-1 text-sm ease-in-out hover:bg-accent">
      {children}
    </a>
  )
}
