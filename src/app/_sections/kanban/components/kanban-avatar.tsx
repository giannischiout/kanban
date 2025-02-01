import {Tooltip} from "@/app/_components/tooltip";

type Props = {
	initials: string;
	contributor: string;
	color: string;
}
export function KanbanAvatar({initials,  contributor, color}:  Props) {
	return (
		<Tooltip title={ contributor}>
			<div className=" shadow-[12px_0_10px_rgba(0,0,0,0.4)] flex items-center justify-center h-6 w-6  rounded-full   hover:ring-2 hover:ring-primary transition-all duration-300" style={{backgroundColor: color}}>
					<span className="text-xs">{initials}</span>
			</div>
		</Tooltip>
	)
}
export function Avatar({initials,  color}:  {	initials: string;
	color: string;}) {
	return (
			<div className=" text-amber-50   flex items-center justify-center h-6 w-6  rounded-full   hover:ring-2 hover:ring-primary transition-all duration-300" style={{backgroundColor: color}}>
					<span className="z-10 text-xs">{initials}</span>
			</div>
	)
}
