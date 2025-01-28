import {Tooltip} from "@/app/_components/tooltip";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function KanbanAvatar({image, alt, contributor}: { image: string, alt: string,  contributor: string }) {
	return (
		<Tooltip title={ contributor}>
			<Avatar className="h-6 w-6 border-gray-400  border">
				<AvatarImage
					src={`/profiles/${image}`}
					alt={alt} className="object-cover"
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</Tooltip>
	)
}
