import * as React from "react"


import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

import {usePopover} from "@/hooks/usePopover";
import {cn} from "@/lib/utils";
import {X} from "lucide-react"
import {Calendar} from "@/components/ui/calendar";
import {Calendar as CalendarIcon} from "lucide-react"
import dayjs from "dayjs";

type ComboboxProps = {
	label: string;
	value: string,
	handleValue: (dateStr: string) => void;
}

export function SelectDate(
	{
		label,
		value,
		handleValue,
	}: ComboboxProps) {
	const {open, onOpen, onClose} = usePopover()

	return (
		<div className="flex items-center space-x-14">
			<p className="text-sm text-nowrap">{label}</p>
			<Popover open={open} onOpenChange={onOpen}>
				<PopoverTrigger className="w-full flex items-center gap-2"   >
					<div className={
						cn(
							"flex-1 min-w-[200px] border border-transparent  flex rounded items-center gap-2 px-3 py-3  hover:bg-surface-600",

						)
					}>
						{value ? (
							<div className=" bg-surface-100  w-8 h-8 rounded-full flex items-center justify-center">
								<CalendarIcon size={15} className="text-white"/>
							</div>
						): (
							<div className="group-hover:opacity-1 border border-muted-foreground border-dashed w-8 h-8 rounded-full flex items-center justify-center">
								<CalendarIcon size={15} className="text-muted-foreground"/>
							</div>
						)}
						<GetLabel value={value}/>
						<CloseBtn
							onClick={() => handleValue(null)}
							onClose={onClose}
							id={value}
						/>
					</div>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto p-0"
					 align="start">
					<Calendar
						fromDate={new Date()}
						mode="single"
						selected={new Date(value)}
						onSelect={(date) => {
							handleValue(dayjs(date).format('MM-DD-YYYY'))
							onClose();
						}}
						className="rounded-md border shadow"
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}

const GetLabel = ({value}: { value:string }) => {
	return (
		<span
			className={cn(
				"group-hover:text-primary-foreground text-nowrap",
				value ? "tex-white" : 'text-muted-foreground'
			)}>
			{value || 'No due date'}
		</span>
	)
}



const CloseBtn = (
	{
		onClick,
		onClose,
		id
	}: {
		id: string,
		onClose: () => void,
		onClick: () => void,
	}) => {
	if(!id) return null
	return (
		<div
			onClick={(e) => {
				e.stopPropagation()
				onClose();
				onClick()
			}}
			className="w-6 h-6 rounded flex items-center justify-center">
			<X size={14}/>
		</div>
	)
}


