import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Ellipsis, Pencil, Plus,} from "lucide-react";
import {Button} from "@/components/ui/button";

export function KanbanCardMenu() {
	return (
		<DropdownMenu  >
			<DropdownMenuTrigger asChild>
				<Button className="h-8 w-8 [&_svg]:size-5" size="iconMedium" variant="ghost">
					<Ellipsis className="text-muted-foreground"/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>
						Task Menu
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Pencil  />
						Edit task
					</DropdownMenuItem><DropdownMenuItem>
						<Plus  />
						Add new task
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
