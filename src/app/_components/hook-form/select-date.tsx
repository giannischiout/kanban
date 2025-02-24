import * as React from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { usePopover } from '@/hooks/usePopover'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-react'
import dayjs from 'dayjs'

type ComboboxProps = {
  label: string
  value: string
  handleValue: (dateStr: string) => void
}

export function SelectDate({ label, value, handleValue }: ComboboxProps) {
  const { open, onOpen, onClose } = usePopover()

  return (
    <div className="flex items-center space-x-14">
      <p className="text-nowrap text-sm">{label}</p>
      <Popover open={open} onOpenChange={onOpen}>
        <PopoverTrigger className="flex w-full items-center gap-2">
          <div className={cn('hover:bg-surface-600 flex min-w-[200px] flex-1 items-center gap-2 rounded border border-transparent px-3 py-3')}>
            {value ? (
              <div className="bg-surface-100 flex h-8 w-8 items-center justify-center rounded-full">
                <CalendarIcon size={15} className="text-white" />
              </div>
            ) : (
              <div className="group-hover:opacity-1 flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-muted-foreground">
                <CalendarIcon size={15} className="text-muted-foreground" />
              </div>
            )}
            <GetLabel value={value} />
            <CloseBtn onClick={() => handleValue(null)} onClose={onClose} id={value} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            fromDate={new Date()}
            mode="single"
            selected={new Date(value)}
            onSelect={(date) => {
              handleValue(dayjs(date).format('MM-DD-YYYY'))
              onClose()
            }}
            className="rounded-md border shadow"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const GetLabel = ({ value }: { value: string }) => {
  return <span className={cn('text-nowrap group-hover:text-primary-foreground', value ? 'tex-white' : 'text-muted-foreground')}>{value || 'No due date'}</span>
}

const CloseBtn = ({ onClick, onClose, id }: { id: string; onClose: () => void; onClick: () => void }) => {
  if (!id) return null
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onClose()
        onClick()
      }}
      className="flex h-6 w-6 items-center justify-center rounded"
    >
      <X size={14} />
    </div>
  )
}
