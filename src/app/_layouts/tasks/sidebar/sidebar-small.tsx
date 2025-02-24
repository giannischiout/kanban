import { Ellipsis, House, Mail } from 'lucide-react'
import { useSidebar } from '@/app/_context/sidebar-context'
import { MenuItem } from '@/app/_layouts/tasks/sidebar/sidebar-main'
import { Employee } from '@/app/types/employee'

export function SidebarSmall({ user }: { user: Employee }) {
  const { isSidebarOpen } = useSidebar()
  if (isSidebarOpen) return null
  return (
    <aside className="group h-full border-r border-border font-sans">
      <div className="flex h-12 cursor-pointer items-center justify-center gap-1.5 rounded-md border-b border-border px-1.5">
        <span
          className="flex h-6 w-6 items-center justify-center rounded text-sm font-medium text-white"
          style={{ backgroundColor: user?.avatarColor }}
        >
          {/*{user.fullName.charAt(0).toUpperCase()}*/}
        </span>
      </div>
      <div className="flex flex-col gap-1 border-b border-border px-3 py-3">
        <MenuItem>
          <House className="text-muted-foreground" size={15} />
        </MenuItem>
        <MenuItem>
          <Mail className="text-muted-foreground" size={16} />
        </MenuItem>
        <MenuItem>
          <Ellipsis className="text-muted-foreground" size={16} />
        </MenuItem>
      </div>
    </aside>
  )
}
