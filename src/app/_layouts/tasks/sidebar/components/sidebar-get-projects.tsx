import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Project } from '@/app/types/project'

type GetProjectsProps = {
  projects: Project[]
  isLoading: boolean
  error?: string
}
export function GetProjects({ projects }: GetProjectsProps) {
  const [activeProject, setActiveProject] = useState(projects[0]?._id)
  const router = useRouter()
  // if (isLoading)
  //   return (
  //     <div className="mt-2 flex flex-col gap-1.5 p-3">
  //       {Array.from({ length: 4 }).map((_, index) => (
  //         <Skeleton key={index} className="w-full p-3.5" />
  //       ))}
  //     </div>
  //   )

  const handleProjectClick = (slug) => {
    router.push(`/projects/${slug}/kanban`)
  }
  return (
    <div className="flex flex-col gap-1">
      {projects?.map((project) => (
        <div
          onClick={() => setActiveProject(project?._id)}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-200 ease-in-out hover:bg-secondary',
            activeProject === project?._id ? 'bg-primary/5 font-medium text-primary' : 'bg-transparent'
          )}
          key={project._id}
        >
          <span className="h-4 w-4 rounded-md" style={{ backgroundColor: project.color }} />
          <span className="text-muted0-light max-w-[18ch] truncate text-ellipsis">{project.name}</span>
        </div>
      ))}
    </div>
  )
}
