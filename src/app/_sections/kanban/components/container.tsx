import {ReactNode} from "react";
import {IKanbanColumn} from "@/app/types/kanban";
import {Plus} from "lucide-react";


type ContainerProps = {
	children: ReactNode;
	column: IKanbanColumn;
}
export function Container({children, column}: ContainerProps) {
	return (
		<div className="bg-card min-w-[300px] rounded-md shadow-xl">
			<div className="flex  p-3 items-center justify-between">
				<div className="flex  flex-row items-center gap-2">
					<Bullet color={column.color}/>
					<p className="font-medium ">{getTitle(column.title)}</p>
					<p className="text-muted">{column.taskIds.length}</p>
				</div>
					<Plus size={20} />
			</div>
			<div className="p-2 bg-surface">
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
	return title.charAt(0).toUpperCase() + title.slice(1)
}
