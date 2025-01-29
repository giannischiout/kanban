import {Tooltip} from "@/app/_components/tooltip";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function KanbanAvatar({image, alt, contributor}: { image: string, alt: string,  contributor: string }) {
	return (
		<Tooltip title={ contributor}>
			<Avatar className="h-7 w-7  shadow-stone-100 shadow-2xl hover:ring-2 hover:ring-primary transition-all duration-300">
				<AvatarImage
					src={`/profiles/${image}`}
					alt={alt} className="object-cover rounded-full "
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</Tooltip>
	)
}
