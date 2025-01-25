import { cloneElement, ReactElement } from "react";

type IconProps = {
	label: string | number | null;
	icon: ReactElement<{ size?: number; className?: string }>;
};

export function IconWithText({ label, icon }: IconProps) {
	return (
		<div className="flex gap-1 items-center">
			{cloneElement(icon, { size: 14, className: "text-muted" })}
			<span className="text-sm select-none">{label}</span>
		</div>
	);
}