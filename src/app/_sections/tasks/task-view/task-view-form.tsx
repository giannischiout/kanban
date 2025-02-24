'use client'
import { useForm } from 'react-hook-form'
import { useCallback, useMemo } from 'react'
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Calendar, Search } from 'lucide-react'
import { Button } from '@/app/_components/buttons'
import { SelectAssignees } from '@/app/_components/hook-form/select-assignees'
import { mock_assignees } from '@/app/mock/assignees'
import { SelectDate } from '@/app/_components/hook-form/select-date'
import dayjs from 'dayjs'

const AssigneeSchema = zod.object({
  id: zod.number(),
  firstName: zod.string(),
  lastName: zod.string(),
})
const TaskSchema = zod.object({
  assignee: zod.object({
    id: zod.number(),
    firstName: zod.string(),
    lastName: zod.string(),
    initials: zod.string(),
  }),
  title: zod.string(),
  description: zod.string(),
  dueDate: zod.string(),
})
export type TaskSchemaType = zod.infer<typeof TaskSchema>
export type AssigneeSchemaType = zod.infer<typeof AssigneeSchema>

export function TaskViewForm() {
  const defaultValues = useMemo(
    () => ({
      assignees: {
        id: 1,
        firstName: 'john',
        lastName: 'Chioutakos',
      },
      dueDate: '',
      title: 'Task 2',
    }),
    []
  )

  const methods = useForm<TaskSchemaType>({
    defaultValues,
    resolver: zodResolver(TaskSchema),
  })
  const { watch, handleSubmit, setValue } = methods
  const values = watch()

  const onSubmit = useCallback((submitValues: TaskSchemaType) => {
    console.log({ submitValues })
  }, [])

  const handleValue = (key: string, value: AssigneeSchemaType[keyof AssigneeSchemaType]) => {
    setValue(key, value)
  }

  const handleAssignee = (value) => {
    console.log('change value: ', value)
    setValue('assignee', value)
  }

  const handleDate = (newDateStr: string) => {
    setValue('dueDate', newDateStr)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="title"
        className="flex h-auto border-transparent pl-2 ring-white hover:border-input focus:ring-1"
        style={{ fontSize: '1.4rem' }}
        value={values.title}
        onChange={(e) => {
          handleValue(e.target.name, e.target.value)
        }}
      />
      <div className="flex w-full flex-col gap-2.5 pt-4">
        {/* assignee */}
        <div className="ml-2 grid grid-cols-[minmax(5px,100px)_auto] items-center justify-start gap-2.5">
          <SelectAssignees options={Object.values(mock_assignees)} key="id" value={values.assignee} handleValue={handleAssignee} label="Assignee" />
        </div>
        <div className="ml-2 grid grid-cols-[minmax(5px,100px)_auto] items-center justify-start gap-2.5">
          <SelectDate value={values.dueDate} handleValue={handleDate} label="Due Date" />
        </div>
        {/*<div className="ml-2 grid grid-cols-[minmax(5px,100px)_auto] items-center justify-start gap-2.5">*/}
        {/*	<SelectDate*/}
        {/*		value={values.dueDate}*/}
        {/*		handleValue={handleDate}*/}
        {/*		label="Due Date"*/}
        {/*	/>*/}
        {/*</div>*/}
      </div>
    </form>
  )
}

export const SearchInput = () => {
  return (
    <div className="relative">
      <Search size={15} className="absolute left-2 top-1/2 -translate-y-1/2 transform" />
      <Input className="pl-8" />
    </div>
  )
}
