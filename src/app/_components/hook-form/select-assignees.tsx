import * as React from "react"

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {Check, User} from "lucide-react";
import {Avatar} from "@/app/_sections/kanban/components/kanban-avatar";
import {usePopover} from "@/hooks/usePopover";
import {Assignee} from "@/app/types/kanban";
import {cn} from "@/lib/utils";
import {X} from "lucide-react"

type ComboboxProps = {
	options: Assignee[],
	label: string;
	value: Assignee,
	handleValue: (value: Assignee) => void;
	key: keyof Assignee
}

export function SelectAssignees(
	{
		options,
		label,
		value,
		handleValue,
	}: ComboboxProps) {
	const {open, onOpen, onClose} = usePopover()

	return (
		<div className="flex items-center space-x-14">
			<p className="text-sm">{label}</p>
			<Popover open={open} onOpenChange={onOpen}>
				<PopoverTrigger className="w-full flex items-center gap-2"   >
					<div className="flex-1  flex rounded-md items-center gap-2 px-3 py-3 hover:bg-surface-600">
					  < GetAvatar value={value} />
						<GetLabel value={value} />
						<CloseBtn
							onClick={() => handleValue(null)}
							onClose={onClose}
							id={value?.id}
						/>
					</div>
				</PopoverTrigger>
				<PopoverContent className="p-0" align="start">
					<Command>
						<CommandInput placeholder="Change assignee..."/>
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{options?.map((option: Assignee) => {
									return (
										<CommandItem
											key={option.id}
											className="p-2.5"
											onSelect={() => {
												handleValue(option)
												onClose()
											}}
										>
											<div className="flex flex-1 gap-2 items-center">
												<Avatar initials={option.initials} color={option.avatarColor}/>
												<span>{`${option.firstName} ${option.lastName}`}</span>
											</div>
											{option.id === value?.id && <Check className="mr-2" size={15} />}
										</CommandItem>
									)
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

const GetLabel = ({value}: { value:Assignee }) => {
	return (
		<span
			className={cn(
				"group-hover:text-primary-foreground text-nowrap",
				value ? "tex-white" : 'text-muted-foreground'
			)}>
			{value ? `${value.firstName} ${value.lastName}` : 'No assignee'}
		</span>
	)
}



const CloseBtn = (
	{
		onClick,
		onClose,
		id
	}: {
		id: number,
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


const GetAvatar = ({value}: {value: Assignee}) => {
	if (value?.id) {
		return (
			<Avatar initials={value.initials} color={value.avatarColor} size="md" />
		);
	} else {
		return (
			<div className="group-hover:opacity-1 border border-muted-foreground border-dashed w-8 h-8 rounded-full flex items-center justify-center">
				<User size={17} className="text-muted-foreground" />
			</div>
		);
	}
}