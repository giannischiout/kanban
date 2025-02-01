'use client'
import {  X} from "lucide-react";
import {Sheet, SheetContent, SheetTitle, } from "@/components/ui/sheet";
import * as SheetPrimitive from "@radix-ui/react-dialog"
import {Assignees} from "@/app/_components/assignees";


type Props = {
	open: boolean;
	onClose: () => void;
}

export function TaskViewSheet({ open, onClose}: Props) {
	return (
		<Sheet open={open} onOpenChange={onClose}>
			<SheetContent className="lg:min-w-[500px] sm:min-w-[200px] ">
				<div className="p-4 flex justify-between border-b border-surface-400">
					<SheetTitle>test</SheetTitle>
					<SheetPrimitive.Close
						className=" rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary">
						<X className="h-4 w-4"/>
					</SheetPrimitive.Close>
				</div>
				{/* sheet form */}
				<section className="p-4 w-full">
					<div className="w-full  ">
						<Assignees />
					</div>
				</section>
			</SheetContent>
		</Sheet>
	)
}