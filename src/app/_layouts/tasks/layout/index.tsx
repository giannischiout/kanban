'use client'
import { ReactNode } from 'react'
import { SidebarMain } from '@/app/_layouts/tasks/sidebar/sidebar-main'
import { SidebarSmall } from '@/app/_layouts/tasks/sidebar/sidebar-small'
import { Button } from '@/components/ui/button'
import { PanelRightOpen } from 'lucide-react'
import { useSidebar } from '@/app/_context/sidebar-context'
import { useGetUser } from '@/app/_actions/user'
import { Project } from '@/app/types/project'
import { MainNav } from '@/app/_layouts/tasks/nav/main-nav'

type LayoutProps = {
  children: ReactNode
  projects: Project[]
}

const userId = process.env.NEXT_PUBLIC_USER

export default function TasksLayout({ children, projects }: LayoutProps) {
  const { openSidebar, isSidebarOpen } = useSidebar()
  const { user } = useGetUser(userId)

  return (
    <div>
      <MainNav />
      <section className="flex h-[calc(100vh-40px)]">
        {isSidebarOpen ? <SidebarMain user={user} projects={projects} /> : <SidebarSmall user={user} />}
        <div className="flex flex-1 flex-col">
          <nav className="h-12 w-full border-b border-border p-4">
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
          </nav>
          <main className="flex-1 overflow-y-scroll">{/*{children}*/}</main>
        </div>
      </section>
    </div>
  )
}
