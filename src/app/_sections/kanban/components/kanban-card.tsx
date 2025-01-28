import {ITask} from "@/app/types/kanban";
import { MessageSquare, Paperclip,} from "lucide-react";
import {useSortable} from "@dnd-kit/sortable";
import {ActiveState} from "@/app/_sections/kanban/view";
import {useCallback} from "react";
import {Priority} from "@/app/_components/priority";
import {IconWithText} from "@/app/_components/icon-with-text";
import {CardContent} from "@/app/_sections/kanban/components/kanban-card-content";
import {KanbanAvatar} from "@/app/_sections/kanban/components/kanban-avatar";
import {KanbanCardMenu, } from "@/app/_sections/kanban/components/kanban-card-dropdown-menu";
import {GrabButton} from "@/app/_sections/kanban/components/kanban-grab";

type KanbanCardProps = {
	item: ITask,
	id: string,
	active?: ActiveState,
	columnId: string,
	isOverlay?: boolean
}

export function KanbanCard({item, id, active, columnId}: KanbanCardProps) {
	const {title, priority, description, comments, contributors, attachments} = item;

	const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
		id,
		data: {type: 'item', columnId}
	});

	const style = {
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
		transition,
		opacity: isDragging && active?.type === 'item' ? 0.4 : 1,


	};

	const handleMenu = useCallback(() => {
		console.log('menu btn')
	}, [])
	return (
		<div
			className="w-full rounded-lg bg-surface-500 border-2 border-surface-300 flex flex-col justify-between shadow-xl  select-none  cursor-default"
			ref={setNodeRef}
			{...attributes}
			style={{
				...style,
			}}
		>
			<div className="p-2.5  border-b " style={{borderBottomColor: '#222222'}}>
				<div className="flex flex-row justify-between items-center">
					{/* Top bar: drag and drop / menu */}
					<Priority status={priority}/>
					<div className=" flex justify-end gap-1 ">
						<KanbanCardMenu />
						<GrabButton listeners={listeners} />
					</div>
				</div>
				<CardContent title={title} description={description}/>
			</div>
			{/* Bottom: contributors-avatars */}
			<div className="p-2.5 flex justify-between">
				<div className="flex">
					{
						contributors && contributors.map((avatar, index) => (
							<div className="flex gap-1 items-center" key={avatar.id} style={{marginLeft: -(index * 5)}}>
								<KanbanAvatar contributor={avatar.name} image={avatar.image} alt={avatar.name}/>
							</div>
						))
					}
				</div>
				{/* comments and attachments */}
					<div className="flex gap-3">
					{attachments && <IconWithText label={attachments || 0} icon={<Paperclip />} />}
		 			{comments && <IconWithText label={comments} icon={<MessageSquare/>} />}
		 		</div>
		 	</div>
		</div>


	)
}





