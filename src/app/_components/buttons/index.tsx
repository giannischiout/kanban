import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ReactNode } from 'react'
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
export function Button({
  children,
  tooltipText,
  tooltipContent,
  variant = 'default',
  size,
  className,
  onClick = () => {},
  type = 'button',
}: ButtonProps) {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <ShadcnButton onClick={onClick} className={className} variant={variant} size={size} type={type}>
          {children}
        </ShadcnButton>
      </TooltipTrigger>
      <TooltipContent sideOffset={10} alignOffset={14}>
        {tooltipContent || <span>{tooltipText}</span>}
      </TooltipContent>
    </Tooltip>
  )
}
