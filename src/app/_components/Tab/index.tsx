'use client';
import {BookOpenText, X} from "lucide-react";

type OpenTaskFramerProps = {
	title: string;
	active: string;
	handleActive: (active: string) => void;
	handleClearTab: (active: string) => void;
};

export function Tab({ title, active, handleActive, handleClearTab }: OpenTaskFramerProps) {
	const isActive = active === title
	return (
		<div
			onClick={() => handleActive(title)
			}
			className={`
			flex 
			cursor-pointer
			items-center 
			gap-3 
			justify-between 
			h-full 
			px-4 py-1 
			${ "border-r border-border"} 
			${isActive ? 'bg-card' : 'bg-transparent'}`}
		>
			<div className={
				`flex gap-2 items-center  `
			}>
				<BookOpenText size={16} className={isActive ? "text-primary": "text-muted-card"}/>
				<p className={`text-sm ${!isActive && 'text-muted-card' }`}>{title}</p>
			</div>
			<button onClick={(e) =>  {
				e.stopPropagation()
				handleClearTab(title)
			}}>
				<X  size={16} className="text-muted-card" />
			</button>
		</div>
	);
}


