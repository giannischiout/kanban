import {Flag} from "lucide-react";


type PriorityProps ={
	status: string;
}

export function Priority({status}: PriorityProps) {

	const {text, background, border} = getColor(status)
	const statusCap = `${ status.charAt(0).toUpperCase()}${status.slice(1)}`
	return (
		<div
			className="px-1.5 py-1 rounded flex flex-row size gap-0.5 items-center"
			style={{
				backgroundColor: background,
				border: `1px solid ${border}`
		}}
		>
			 <Flag style={{color: text}} size={11} strokeWidth={4} />
			<span className=" text-[0.72rem] tracking-wider" style={{color: text}}>{statusCap}</span>
		</div>
	)
}


const getColor = (priority: string): { background: string; text: string, border: string } => {
	switch (priority) {
		case 'high':
			return {
				background: 'rgba(246,63,63,0.07)',
				border: 'rgba(246,63,63,0.16)',
				text: 'rgba(246,63,63,0.64)'
			};
		case 'medium':
			return  {
				background: 'rgba(241,141,14,0.05)',
				border: 'rgba(246,154,39,0.1)',
				text: 'rgba(241,141,14,0.56)'
			};
		case 'low':
			return  {
				background: 'rgba(18,183,87,0.38)',
				border: 'rgba(18,183,87,0.45)',
				text: '#12b757'
			};
		default:
			return {
				background: 'rgba(241,241,241,0.74)',
				border: 'rgba(241,241,241,0.74)',
				text: '#535252'
			};
	}
};
