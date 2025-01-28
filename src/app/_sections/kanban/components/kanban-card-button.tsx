import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";

type KanbanBtnProps = {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	variant?: "default" | "destructive" | "outline" | "secondary" | "surface" | "light" | "ghost" | "link";
};

export function KanbanButton(
	{
		children,
		onClick = () => {},
		className = "",
		variant= 'default'
	}: KanbanBtnProps) {
	return (
		<Button
			variant={variant }
			type="button"
			onClick={onClick}
			className={twMerge("w-[30px] h-[30px]",
				className
			)}
		>
			{children}
		</Button>
	);
}
