import { ReactNode } from 'react'
import { SidebarProvider } from '@/app/_context/sidebar-context'
import TasksLayout from '@/app/_layouts/tasks/layout'
import { getProjects } from '@/app/_actions/project'

type LayoutProps = {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const data = await getProjects()
  return (
    <SidebarProvider>
      <TasksLayout projects={data?.result}>{children}</TasksLayout>
    </SidebarProvider>
  )
}
