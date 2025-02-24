import { ChevronDown, ChevronRight, Folder } from 'lucide-react'

export function BreadCrumbs({ tab }: { tab: string }) {
  return (
    <div className="flex w-full items-center gap-2 pb-3 pt-6">
      <div className="flex cursor-pointer items-center gap-4 rounded-md bg-card px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <Folder size={14} />
          <p className="text-sm">Agency</p>
        </div>
        <ChevronDown size={16} className="text-muted-card" />
      </div>
      <ChevronRight className="text-muted-card" size={18} />
      <p>{tab}</p>
    </div>
  )
}
