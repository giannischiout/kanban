import { cloneElement, ReactElement } from "react";

type IconButtonProps = {
	children: ReactElement<{size: number}>;
	size?: "small" | "medium";
};

export function IconButton({ children, size = 'small' }: IconButtonProps) {
	let scale: number;
	switch (size) {
		case "small":
			scale = 30;
			break;
		case "medium":
			scale = 35;
			break;
		default:
			scale = 40;
	}

	return (
		<button
			style={{ width: `${scale}px`, height: `${scale}px` }}

			className={`hover:bg-gray-700 flex items-center justify-center rounded-full`}
		>
			{cloneElement(children, { size: scale - 10 })}
		</button>
	);
}
