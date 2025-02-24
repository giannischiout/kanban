'use client'
import { BookOpenText, X } from 'lucide-react'

type OpenTaskFramerProps = {
  title: string
  active: string
  handleActive: (active: string) => void
  handleClearTab: (active: string) => void
}

export function Tab({ title, active, handleActive, handleClearTab }: OpenTaskFramerProps) {
  const isActive = active === title
  return (
    <div
      onClick={() => handleActive(title)}
      className={`flex h-full cursor-pointer items-center justify-between gap-3 px-4 py-1 ${'border-r border-border'} ${isActive ? 'bg-card' : 'bg-transparent'}`}
    >
      <div className={`flex items-center gap-2`}>
        <BookOpenText size={16} className={isActive ? 'text-primary' : 'text-muted-card'} />
        <p className={`text-sm ${!isActive && 'text-muted-card'}`}>{title}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClearTab(title)
        }}
      >
        <X size={16} className="text-muted-card" />
      </button>
    </div>
  )
}
