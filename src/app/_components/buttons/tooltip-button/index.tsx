import { Button, buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ReactNode, useMemo } from 'react'
import { VariantProps } from 'class-variance-authority'

type ButtonProps = {
  children: ReactNode
  tooltipContent?: ReactNode
  tooltipText?: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  className?: string
  text?: 'muted'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
}
export function TooltipButton({ children, tooltipText, tooltipContent, variant = 'default', size, className, onClick = () => {}, type = 'button' }: ButtonProps) {
  return (
    <Tooltip delayDuration={50}>
      <TooltipTrigger asChild>
        <Button onClick={onClick} className={className} variant={variant} size={size} type={type}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={10} alignOffset={14}>
        {tooltipContent || <span>{tooltipText}</span>}
      </TooltipContent>
    </Tooltip>
  )
}
