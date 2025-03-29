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
//
// export const getProjects = cache(async (slug: string): Promise<GetProjects> => {
//   try {
//     const { data } = await axios.get(`${ENDPOINT}/${slug}`)
//     return {
//       success: true,
//       result: data.result,
//       message: data.message,
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError<{ message: string }>
//     return {
//       success: false,
//       result: [],
//       message: axiosError.response?.data?.message || 'Failed to fetch projects',
//     }
//   }
// })

export default function TasksLayout({ children, projects }: LayoutProps) {
  const { isSidebarOpen } = useSidebar()
  const { user } = useGetUser(userId)
  // const pathname = usePathname()
  // const slug = pathname.split('/')[2]

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
