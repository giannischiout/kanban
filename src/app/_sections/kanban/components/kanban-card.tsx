import {ITask} from "@/app/types/kanban";
import {Priority} from "@/components/priority";
import {Ellipsis, MessageSquare, Paperclip} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {IconWithText} from "@/app/_components/icon-with-text";




export function KanbanCard({item}: {item: ITask})
{
	const {title, priority, description, comments, contributors, attachments} = item;
	return (
		<div className="max-w-[300px] min-h-[170px] rounded-md border-border p-4 bg-card-light flex  flex-col justify-between">
			<div className="flex flex-row justify-between items-center">
				<Priority status={priority} />
			 <Ellipsis size={14} />
			</div>
			{/* content description - title */}
			<div>
				<p className="text">{title}</p>
				<p className="text-muted-card text-sm line-clamp-2 overflow-hidden min-h-[2.5rem]">{description}</p>
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