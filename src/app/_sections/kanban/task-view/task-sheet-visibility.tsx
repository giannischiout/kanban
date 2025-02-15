import {Lock} from "lucide-react";
import {Button} from "@/app/_components/buttons";

export function TaskVisibility() {
	return (
		<div
			style={{backgroundColor: '#1b1b1b'}}
			className="px-6 py-2 bg-surface flex items-center justify-between">
			{/* task status text */}
			<div className="flex  gap-2 items-center">
				<Lock className="text-muted-foreground" size={14}/>
				<p className="text-sm select-none">This task is private to you</p>
			</div>
			{/* {visibility action} */}
			<Button
				className="hover:bg-surface-600/50"
				tooltipText="Allow everyone your company to see it"
				variant="ghost" text="muted">Make Public</Button>
		</div>
	)
}