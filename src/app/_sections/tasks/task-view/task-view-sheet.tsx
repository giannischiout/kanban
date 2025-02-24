import { Check, Ellipsis, LayoutList, Lock, Maximize2, Paperclip, ThumbsUp, X } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { TaskViewForm } from '@/app/_sections/kanban/task-view/task-view-form'
import { Button } from '@/app/_components/buttons'
import { Separator } from '@/components/ui/separator'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useGetTask } from '@/app/_actions/tasks'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TaskSheetNav } from '@/app/_sections/kanban/task-view/task-sheet-nav'
import { TaskVisibility } from '@/app/_sections/kanban/task-view/task-sheet-visibility'

type Props = {
  open: boolean
  onClose: () => void
  taskId: string
}

export function TaskViewSheet({ taskId, open, onClose }: Props) {
  console.log({ taskId })
  const { task } = useGetTask(taskId)
  console.log({ task })
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:min-w-[200px] lg:min-w-[700px]">
        <SheetHeader>
          <SheetTitle>test</SheetTitle>
        </SheetHeader>
        {/*<div>*/}
        {/*	<TaskSheetNav onClose={onClose}/>*/}
        {/*	<TaskVisibility/>*/}
        {/*	<section className="p-4 w-full">*/}
        {/*		<TaskViewForm />*/}
        {/*	</section>*/}
        {/*</div>*/}
      </SheetContent>
    </Sheet>
  )
}
