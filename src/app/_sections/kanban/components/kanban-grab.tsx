import {Move} from "lucide-react";
import { DraggableSyntheticListeners} from "@dnd-kit/core";
import {Button, buttonVariants} from "@/components/ui/button";
import {VariantProps} from "class-variance-authority";


type Props = {
	listeners:DraggableSyntheticListeners,
	variant?: VariantProps<typeof buttonVariants>["variant"]
}
export function GrabButton({listeners, variant= "surface"}: Props) {
	return (
			<Button {...listeners} size="icon" variant={variant} className="cursor-grab ">
				<Move className="text-muted-foreground"/>
			</Button >
	)
}