import {Button} from "@/components/ui/button";
import {Ellipsis, Eye, Trash2} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


export function TaskPopover() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="w-6 h-6 "
				>
					<Ellipsis size={18} className="text-muted-foreground" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className=" w-56">
				<DropdownMenuItem>
					<Eye />
					<span>View or Edit</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="focus:bg-red-400/10">
					<Trash2 className="text-red-500/60" />
					<span className="text-red-500/60">Delete Task</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}