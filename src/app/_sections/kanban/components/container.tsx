import {ReactNode} from "react";
import {IKanbanColumn} from "@/app/types/kanban";
import {Grip, Plus} from "lucide-react";
import {

	useSortable,
} from "@dnd-kit/sortable";
import {Button} from "@/components/ui/button";
import {

	UniqueIdentifier,

} from "@dnd-kit/core";


type ContainerProps = {
	children: ReactNode;
	column: IKanbanColumn;
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
			{...attributes}
			style={style}
			className="bg-card min-w-[300px] rounded-md shadow-xl h-full overflow-auto"
		>
			<div className="flex p-3 items-center justify-between">
				<div className="flex flex-row items-center gap-2">
					<Bullet color={column.color}/>
					<p className="font-medium ">{column.title}</p>
					<p className="text-muted">{column.taskIds.length}</p>
				</div>
				<div className="flex gap-2 items-center">
					<DragHandle listeners={listeners}/>
					<Plus size={15} />
				</div>
			</div>
				<div className="p-2  flex flex-col gap-2">
					{children}
				</div>
		</div>
	)
}

export function DragHandle({listeners}: { listeners: any}) {
	return (
		<Button {...listeners} className='p-0 m-0 w-[40px] h--[20px] bg-surface-500 text-muted '>
			<Grip size={16} />
		</Button>
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
