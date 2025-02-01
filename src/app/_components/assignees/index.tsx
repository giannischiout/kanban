"use client"

import * as React from "react"


import {IAssignee, mock_assignees} from '@/app/mock/assignees'
import {useCallback, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Avatar} from "@/app/_sections/kanban/components/kanban-avatar";
import {Check} from "lucide-react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";

export function Assignees() {
	const [selected, setSelected] = useState<IAssignee[]>([])


	const handleSelect = useCallback((assignee: IAssignee) => {
		setSelected((prev) => {
			return prev.some(a => a.id === assignee.id)
				? prev.filter((a) => a.id !== assignee.id)
				: [...prev, assignee]
		})
	}, [selected])
	return (
		<div>

			<Popover>
				<PopoverTrigger asChild>
					<div className="grid w-full  items-center gap-1.5">
						<Label className="text-muted-foreground" >Who is this task for?</Label>
						<div className="p-2 border border-input rounded">
							Assignees
						</div>
					</div>
				</PopoverTrigger>
				<PopoverContent
					onWheel={(e) => e.stopPropagation()} // Prevents scroll blocking
					className="p-1 py-2 h-[300px] overflow-x-scroll">
					{Object.values(mock_assignees).map((assignee: IAssignee) => {
						return (
							<div onClick={() => handleSelect(assignee)}
									 className="flex rounded cursor-pointer hover:bg-surface-400 transform transition-colors ease-in gap-1  p-2"
									 key={assignee.id}>
								<div className="flex gap-2 flex-1 ">
									<Avatar initials={assignee?.initials} color={assignee.avatarColor}/>
									<span className={cn("text-foreground", !selected.includes(assignee) && "text-amber")}>
  									{`${assignee.firstName} ${assignee.lastName}`}
									</span>
								</div>
								<IsSelected selected={selected} assignee={assignee}/>
							</div>
						)
					})}
				</PopoverContent>
			</Popover>
		</div>

	)
}


const IsSelected = ({selected, assignee}) => {
	if (!selected.includes(assignee)) return null
	return (
		<div
			className="w-6 h-6 bg-surface-200 rounded-full flex items-center justify-center transition transform-all ease-in-out ">
			<Check className="text-foreground" size={15}/>
		</div>
	)
}

