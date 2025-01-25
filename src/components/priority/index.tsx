import {Flag} from "lucide-react";


type PriorityProps ={
	status: string;
}

export function Priority({status}: PriorityProps) {

	const style = {
		color: getColor(status)
	}
	return (
		<div className="flex flex-row size gap-1 items-center bg-[]" >
			 <Flag style={style} size={13} />
			<p className="text-sm" style={style}>{status}</p>
		</div>
	)
}


const getColor = (priority: string) => {
	let color = ""; // Use let instead of const
	switch (priority) {
		case 'high':
			color = 'var(--destructive)';
			break;
		case 'medium':
			color = 'orange';
				break;
		case 'low':
			color = 'yellow';
			break;
		default:
			color = 'grey';
	}
	return color;
};