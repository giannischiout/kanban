'use client'
import { ReactNode } from 'react'
import { SidebarMain } from '@/app/_layouts/tasks/sidebar/sidebar-main'
import { SidebarSmall } from '@/app/_layouts/tasks/sidebar/sidebar-small'
import { useSidebar } from '@/app/_context/sidebar-context'
import { useGetUser } from '@/app/_actions/user'
import { Project } from '@/app/types/project'
import { MainNav } from '@/app/_layouts/tasks/nav/main-nav'
import { SecondaryNav } from '@/app/_layouts/tasks/nav/secondary-nav'
import { MenuActions } from '@/app/_layouts/tasks/nav/menu-actions'

type LayoutProps = {
  children: ReactNode
  projects: Project[]
}

const userId = process.env.NEXT_PUBLIC_USER

export default function TasksLayout({ children, projects }: LayoutProps) {
  const { isSidebarOpen } = useSidebar()
  const { user } = useGetUser(userId)
  console.log({ user })
  return (
    <div>
      <MainNav />
      <section className="flex h-[calc(100vh-40px)]">
        {isSidebarOpen ? <SidebarMain user={user} projects={projects} /> : <SidebarSmall user={user} />}
        <div className="flex flex-1 flex-col">
          <SecondaryNav />
          <MenuActions />
          <main className="flex-1 overflow-y-scroll">{children}</main>
        </div>
      </section>
    </div>
  )
}
