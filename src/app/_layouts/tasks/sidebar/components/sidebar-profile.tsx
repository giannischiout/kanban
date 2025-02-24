import { Button } from '@/components/ui/button'
import { ChevronDown, PanelRightOpen } from 'lucide-react'
import { useSidebar } from '@/app/_context/sidebar-context'
import { Skeleton } from '@/components/ui/skeleton'
import { Employee } from '@/app/types/employee'

export function UserProfile({ user }: { user: Employee | null }) {
  const { closeSidebar } = useSidebar()

  if (!user) {
    return <UserProfileSkeleton />
  }

  return (
    <div className="flex h-12 items-center justify-between border-b border-border px-3">
      {/* User Profile */}
      <div className="flex cursor-pointer items-center gap-1 rounded-md ring-secondary transition-all duration-300 ease-in-out hover:bg-secondary hover:ring-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded text-sm text-white"
          style={{ backgroundColor: user.avatarColor || '#999' }}
        >
          {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
        </span>
        <span className="max-w-28 truncate text-sm font-medium">
          {user.firstName} {user.lastName}
        </span>
        <ChevronDown size={16} className="text-muted-foreground" />
      </div>

      {/* Close Sidebar Button */}
      <Button
        onClick={closeSidebar}
        className="hidden h-5 w-5 items-center transition-all duration-200 ease-in-out hover:bg-background group-hover:flex"
        variant="ghost"
        size="icon"
      >
        <PanelRightOpen className="text-muted-foreground" />
      </Button>
    </div>
  )
}

// Skeleton UI for Loading State
function UserProfileSkeleton() {
  return (
    <div className="flex h-12 items-center justify-between border-b border-border px-3">
      <div className="flex items-center gap-1">
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-5 w-5" />
    </div>
  )
}
