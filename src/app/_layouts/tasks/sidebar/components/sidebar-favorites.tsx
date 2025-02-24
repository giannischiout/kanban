import { ChevronDown, Star } from 'lucide-react'

export function Favorites() {
  return (
    <div className="flex w-full border-b border-border px-2 py-2">
      <button className="flex w-full cursor-pointer items-center gap-1.5 rounded-md p-1 px-2 hover:bg-secondary">
        <span className="flex flex-1 items-center gap-2">
          <Star size={14} className="" />
          Favorites
        </span>
        <ChevronDown className="text-muted-foreground" size={16} />
      </button>
    </div>
  )
}