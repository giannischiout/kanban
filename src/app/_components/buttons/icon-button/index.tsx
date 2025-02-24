import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cloneElement, ReactElement, ReactNode } from 'react'

type IconButtonProps = {
  children: ReactElement<{ className: string }>
  tooltipEl?: ReactNode
  tooltip?: string
}
export function IconButton({ children, tooltip, tooltipEl }: IconButtonProps) {
  return (
    <Tooltip delayDuration={50}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="iconMedium">
          {cloneElement(children, { className: 'text-muted-foreground' })}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipEl || <p className="text-sm">{tooltip}</p>}</TooltipContent>
    </Tooltip>
  )
}
