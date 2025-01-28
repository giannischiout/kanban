import {Flag} from "lucide-react";


type PriorityProps ={
	status: string;
}

export function Priority({status}: PriorityProps) {

	const style = {color: getColor(status)}
	const statusCap = `${ status.charAt(0).toUpperCase()}${status.slice(1)}`
	return (
		<div className="flex flex-row size gap-0.5 items-center bg-[]" >
			 <Flag style={style} size={11} strokeWidth={4} />
			<span className=" text-[0.72rem] tracking-wider" style={style}>{statusCap}</span>
		</div>
	)
}


const getColor = (priority: string): string => {
	switch (priority) {
		case 'high':
			return 'rgba(246,63,63,0.64)';
		case 'medium':
			return 'rgba(241,141,14,0.63)';
		case 'low':
			return '#12b757';
		default:
			return 'grey';
	}
};
