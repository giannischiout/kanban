import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { Project } from '@/app/types/project'

type GetProjectsProps = {
  projects: Project[]
}
export function GetProjects({ projects }: GetProjectsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const activeSlug = pathname.split('/')[2]

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}/kanban`)
  }
  return (
    <div className="flex flex-col gap-1">
      {projects?.map((project) => (
        <div
          onClick={() => handleProjectClick(project?.slug)}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-200 ease-in-out hover:bg-accent',
            activeSlug === project?.slug ? 'bg-primary/5 font-medium text-primary' : 'bg-transparent'
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
