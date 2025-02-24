import * as React from 'react'
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'
import { mock_assignees } from '@/app/mock/assignees'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { usePopover } from '@/hooks/usePopover'
import { AssigneeSchemaType } from '@/app/_sections/tasks/task-view/task-view-form'
import { Avatar } from '@/app/_sections/tasks/tasks-kanban-board/kanban-avatar'

type Props = {
  values: AssigneeSchemaType[]
  handleValues: (value: AssigneeSchemaType) => void
}
export const Assignees = ({ values, handleValues }: Props) => {
  //
  const { open, onToggle, onOpen, ref } = usePopover()
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  //
  const getSelected = useCallback((assignee: AssigneeSchemaType) => values.some((value) => value.id === assignee.id), [values])
  //
  const filteredValues = useMemo(() => {
    return search ? Object.values(mock_assignees).filter((a) => a.firstName.includes(search)) : Object.values(mock_assignees)
  }, [search])

  //
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!open) onOpen()
      setSearch(e.target.value)
    },
    [onOpen, open]
  )

  //
  const handleOpen = useCallback(() => {
    inputRef?.current?.focus()
    onToggle()
  }, [onToggle])

  // clean the input, always have the input focused and set the values:
  const handleSelect = useCallback(
    (assignee: AssigneeSchemaType) => {
      inputRef?.current?.focus()
      setSearch('')
      handleValues({
        id: assignee.id,
        firstName: assignee.firstName,
        lastName: assignee.lastName,
      })
    },
    [handleValues]
  )
  return (
    <div ref={ref} className="grid w-full items-center gap-2">
      <Label>Who is this task for?</Label>
      <div className="relative">
        <div onClick={handleOpen} tabIndex={0} className={cn('flex min-h-10 flex-wrap items-center gap-1 rounded-md border border-input p-2', open && 'ring-1 ring-ring')}>
          {values.map((value) => (
            <Chip
              key={value.id}
              title={`${value.firstName} ${value.lastName.charAt(0)}`}
              onRemove={() => {
                setSearch('')
                handleValues(value)
              }}
            />
          ))}
          <input
            onClick={(e) => e.preventDefault()}
            ref={inputRef}
            onChange={handleSearch}
            value={search}
            className="placeholder-foreground-muted ml-1 flex-1 cursor-text bg-transparent outline-none placeholder:font-light"
            placeholder="Search Employee..."
          />
        </div>
        {open && (
          <div style={{ top: '110%' }} className="bg-surface-600 absolute left-0 flex max-h-[300px] w-full flex-col gap-1 overflow-y-auto rounded-md border border-input p-3 shadow-2xl">
            <Empty title="Νο assignees match the search..." isEmpty={filteredValues.length > 0} />
            {filteredValues.map((assignee) => {
              const isSelected = getSelected(assignee)
              return (
                <div
                  key={assignee.id}
                  onClick={() => {
                    handleSelect({
                      id: assignee.id,
                      firstName: assignee.firstName,
                      lastName: assignee.lastName,
                    })
                  }}
                  className={cn('hover:bg-surface-400 flex cursor-pointer gap-1 rounded p-2 transition-colors ease-in', isSelected && 'bg-surface-500')}
                >
                  <div className="flex flex-1 gap-2">
                    <Avatar initials={assignee?.initials} color={assignee.avatarColor} />
                    <span className={cn(!isSelected && 'text-muted-foreground')}>{`${assignee.firstName} ${assignee.lastName}`}</span>
                  </div>
                  <Checkbox checked={isSelected} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const Empty = ({ isEmpty, title }: { isEmpty: boolean; title: string }) => {
  if (isEmpty) return null
  return (
    <div className="bg-surface-300 flex items-center justify-center rounded-sm p-2">
      <span className="text-muted-foreground">{title}</span>
    </div>
  )
}

const Checkbox = ({ checked }: { checked: boolean }) => {
  if (!checked) return null
  return (
    <div className="bg-surface-200 flex h-6 w-6 items-center justify-center rounded-full border transition">
      <Check className="text-amber-100" size={13} />
    </div>
  )
}

const Chip = ({ title, onRemove }: { title: string; onRemove: () => void }) => {
  return (
    <div className="bg-surface-100 flex items-center gap-2 rounded-full p-1 px-2">
      <p className="text-sm font-light">{title}</p>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        className="bg-surface-500 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border outline-none"
      >
        <X size={12} className="text-muted-foreground" />
      </button>
    </div>
  )
}

export default Assignees
