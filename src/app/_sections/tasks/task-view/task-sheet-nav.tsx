import { Button } from '@/app/_components/buttons'
import { Check, Ellipsis, LayoutList, Maximize2, Paperclip, ThumbsUp, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function TaskSheetNav({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ backgroundColor: '#0a0a0a' }} className="grid grid-cols-[auto_1fr] border-b border-input p-4">
      <Button className="hover:bg-green-700/2 border-white/25 hover:border-green-700/40 hover:text-green-700/95" variant="outline">
        <Check className="text-muted-foreground hover:text-green-700/85" />
        Mark as complete
      </Button>
      <div className="flex w-full justify-end gap-1">
        <Button variant="ghost" size="icon-md" tooltipText="Like this task">
          <ThumbsUp className="text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon-md" tooltipText="Attach files">
          <Paperclip className="text-muted-foreground" />
        </Button>
        <Button
          tooltipContent={
            <div className="p-2">
              <div className="mb-2">
                <span className="">Sub Tasks</span>
                <span className="ml-1 rounded border border-input bg-background px-1 py-0.5">Tab</span>
                <span className="ml-1 rounded border border-input bg-background px-2 py-0.5">5</span>
              </div>
              <Separator className="my-1 bg-input" />
              <p className="w-[140px] text-muted-foreground">Add subtask to split work into smaller parts</p>
            </div>
          }
          variant="ghost"
          size="icon-md"
          tooltipText="Sub Tasks"
        >
          <LayoutList className="text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon-md" tooltipText="Full Screen">
          <Maximize2 className="text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon-md" tooltipText="More">
          <Ellipsis className="text-muted-foreground" />
        </Button>
        <Button onClick={onClose} variant="ghost" size="icon-md" tooltipText="Close Task">
          <X className="text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}
