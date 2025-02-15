import {ReactNode} from "react";
import {Column} from "@/app/types/kanban";
import { Plus} from "lucide-react";
import {useSortable} from "@dnd-kit/sortable";
import {Button} from "@/components/ui/button";
import {UniqueIdentifier} from "@dnd-kit/core";
import {GrabButton} from "@/app/_sections/kanban/components/kanban-grab";


type ContainerProps = {
	children: ReactNode;
	column:  Column;
	id: UniqueIdentifier;
}
export function Container({children, column, id}: ContainerProps) {

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, data: {type: 'column', columnId: id} });

	const style = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
		opacity: isDragging ? 0.4 : 1,

	};

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className="cursor-grab bg-surface  flex-1 min-w-[320px] max-w-[360px] rounded-md shadow-xl h-full"
		>
			<div className="flex p-3 items-center justify-between">
					<div className="flex justify-center items-center gap-2">
						<Bullet color={column.color}/>
						<span className="text-center">{column.title}</span>
						<span className="text-muted-foreground">{column.taskIds.length}</span>
				</div>
				<div className="flex gap-2 items-center">
					<Button  size="icon"  variant="light">
						<Plus className="text-muted-foreground"/>
					</Button>
				</div>
			</div>
				<div className="p-3  flex flex-col gap-3">
					{children}
				</div>
		</div>
	)
}



export function Bullet({color: backgroundColor}: { color: string }) {
	return (
		<div className="w-[5px] h-[5px] rounded-full" style={{backgroundColor}} />
	)
}

export const getTitle = ( title: string ) => {
	if(!title) return ""
	return title?.charAt(0)?.toUpperCase() + title?.slice(1)
}
