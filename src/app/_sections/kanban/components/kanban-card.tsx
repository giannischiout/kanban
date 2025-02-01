'use client'

import {ITask} from "@/app/types/kanban";
import {Ellipsis, Eye, MessageSquare, Paperclip,} from "lucide-react";
import {useSortable} from "@dnd-kit/sortable";
import {ActiveState} from "@/app/_sections/kanban/view";
import {Priority} from "@/app/_components/priority";
import {IconWithText} from "@/app/_components/icon-with-text";
import {CardContent} from "@/app/_sections/kanban/components/kanban-card-content";
import {KanbanAvatar} from "@/app/_sections/kanban/components/kanban-avatar";


import {Button} from "@/components/ui/button";

type KanbanCardProps = {
	item: ITask,
	id: string,
	active?: ActiveState,
	columnId: string,
	isOverlay?: boolean
	handleOpenSheet?: () => void;
}

export function KanbanCard(
	{
		handleOpenSheet = () => {},
		item,
		id,
		active,
		columnId
	}: KanbanCardProps) {
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

	return (
		<div
			className="w-full rounded-lg bg-surface-500 border-2 border-surface-300 flex flex-col justify-between shadow-xl  select-none  cursor-grab"
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={{
				...style,
			}}
		>
			<div className="p-2.5  border-b-2 " style={{borderBottomColor: '#222222'}}>
				<div className="flex flex-row justify-between items-center">
					{/* Top bar: drag and drop / menu */}
					<Priority status={priority}/>
					<Button
						onClick={handleOpenSheet}
						variant="ghost"
						className="w-6 h-6 "
					>
						<Eye size={18} className="text-muted-foreground" />
					</Button>
				</div>
				<CardContent title={title} description={description}/>
			</div>
			{/* Bottom: contributors-avatars */}
			<div className="p-2.5 flex ">
				<div className="flex  w-full">
					{contributors && contributors.map((avatar, index) => (
							<div key={avatar?.id} style={{marginLeft: -(index + 4)}}>
								<KanbanAvatar
									contributor={`${avatar?.firstName} ${avatar?.lastName}`}
									initials={avatar?.initials}
									color={avatar?.avatarColor}
								/>
							</div>
					))}
				</div>
				{/* comments and attachments */}
				<div className="flex gap-3">
					{attachments && <IconWithText label={attachments || 0} icon={<Paperclip/>}/>}
					{comments && <IconWithText label={comments} icon={<MessageSquare/>}/>}
				</div>
			</div>
		</div>
	)
}





