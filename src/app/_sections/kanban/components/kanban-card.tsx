import {ITask} from "@/app/types/kanban";
import {Priority} from "@/components/priority";
import {Ellipsis, Grip, MessageSquare, Paperclip} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {IconWithText} from "@/app/_components/icon-with-text";
import {useSortable} from "@dnd-kit/sortable";
import {ActiveState} from "@/app/_sections/kanban/view";


export function KanbanCard({item, id, active, columnId}: {item: ITask, id: string, active?: ActiveState, columnId: string}) {
	if(!item) return;
	const {title, priority, description, comments, contributors, attachments} = item;

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id,  data: {type: 'item', columnId} });

	const style = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
		opacity: isDragging && active?.type === 'item' ? 0.4 : 1,
	};
	return (
		<div
			ref={setNodeRef}
			{...attributes}
			style={style}
			className="max-w-[300px] min-h-[170px] rounded-md border-border p-4 bg-card-light flex  flex-col justify-between shadow-xl select-none">
			<div className="flex flex-row justify-between items-center">
				<Priority status={priority} />
				<div {...listeners} className="flex  items-center gap-2">
					<Ellipsis size={14} />
					{/* drag handler */}
					<div className="h-7 w-7 rounded flex items-center justify-center bg-surface-500">
						<Grip size={18} className="text-muted-card" />
					</div>
				</div>
			</div>
			{/* content description - title */}
			<div>
				<p className="select-none">{title}</p>
				<p className="text-muted-card text-sm line-clamp-2 overflow-hidden min-h-[2.5rem] select-none">{description}</p>
			</div>
			{/* Avatar and Comments */}
			<div className="flex  justify-between">
				<div className="flex">
					{
					contributors && contributors.map((avatar, index) => (
							<div key={avatar.id} style={{marginLeft: -(index * 5)}}>
								<KAvatar image={avatar.image} alt={avatar.name}/>
							</div>
						))
					}
				</div>
				{/* comments and attachments */}
				<div className="flex gap-2">
					{attachments && 	<IconWithText label={attachments || 0} icon={<Paperclip />} />}
					{comments && <IconWithText label={comments} icon={<MessageSquare/>} />}
				</div>

			</div>
		</div>
	)
}


export function KAvatar({image, alt}: { image: string, alt: string }) {
	return (
		<Avatar className="h-6 w-6 border-gray-400  border">
			<AvatarImage
				src={`/profiles/${image}`}
				alt={alt} className="object-cover"
			/>
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	)
}


// <MessageSquare />