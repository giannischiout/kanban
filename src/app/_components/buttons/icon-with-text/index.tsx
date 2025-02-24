import { cloneElement, ReactElement } from 'react'

type IconProps = {
  label: string | number | null
  icon: ReactElement<{ size?: number; className?: string }>
}

export function IconWithText({ label, icon }: IconProps) {
  return (
    <div className="flex items-center gap-1">
      {cloneElement(icon, { size: 14, className: 'text-muted-foreground' })}
      <span className="select-none text-sm">{label}</span>
    </div>
  )
}
