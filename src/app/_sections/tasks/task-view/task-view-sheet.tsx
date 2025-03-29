import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useGetTask } from '@/app/_actions/tasks'

type Props = {
  open: boolean
  onClose: () => void
  taskId: string
}

export function TaskViewSheet({ taskId, open, onClose }: Props) {
  const { task } = useGetTask(taskId)
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
