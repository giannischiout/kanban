import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as ShadcnTooltip } from '@/components/ui/tooltip'
import { ReactNode } from 'react'

type TooltipProps = {
  children: ReactNode
  title: string
}
export function Tooltip({ children, title }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={50}>
      <ShadcnTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  )
}
