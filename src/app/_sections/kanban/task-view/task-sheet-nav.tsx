import {Button} from "@/app/_components/buttons";
import {Check, Ellipsis, LayoutList, Maximize2, Paperclip, ThumbsUp, X} from "lucide-react";
import {Separator} from "@/components/ui/separator";

export function TaskSheetNav({onClose}: {onClose: () => void;}) {
	return (
		<div style={{backgroundColor: "#0a0a0a"}} className="p-4 grid grid-cols-[auto_1fr] border-b border-input">
			<Button className="border-white/25 hover:bg-green-700/2 hover:border-green-700/40 hover:text-green-700/95 " variant="outline">
				<Check className="text-muted-foreground hover:text-green-700/85"/>
				Mark as complete
			</Button>
			<div className="w-full flex justify-end gap-1">
				<Button variant="ghost" size="icon-md" tooltipText="Like this task">
					<ThumbsUp className="text-muted-foreground"/>
				</Button>
				<Button variant="ghost" size="icon-md" tooltipText="Attach files">
					<Paperclip className="text-muted-foreground"/>
				</Button>
				<Button
					tooltipContent={
						<div className="p-2">
							<div className="mb-2">
								<span className="">Sub Tasks</span>
								<span className="ml-1 border border-input rounded px-1  py-0.5  bg-background">Tab</span>
								<span className="ml-1  rounded border border-input px-2 py-0.5 bg-background">5</span>
							</div>
							<Separator className="bg-input  my-1"/>
							<p className="w-[140px] text-muted-foreground">Add subtask to split work into smaller parts</p>
						</div>
					}
					variant="ghost"
					size="icon-md"
					tooltipText="Sub Tasks"
				>
					<LayoutList className="text-muted-foreground"/>
				</Button>
				<Button variant="ghost" size="icon-md" tooltipText="Full Screen">
					<Maximize2 className="text-muted-foreground"/>
				</Button>
				<Button variant="ghost" size="icon-md" tooltipText="More">
					<Ellipsis className="text-muted-foreground"/>
				</Button>
				<Button onClick={onClose} variant="ghost" size="icon-md" tooltipText="Close Task">
					<X className="text-muted-foreground"/>
				</Button>
			</div>
		</div>

	)
}