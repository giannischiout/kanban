import * as React from "react";
import {ChangeEvent, useCallback, useMemo, useRef, useState} from "react";
import {  mock_assignees } from "@/app/mock/assignees";
import { Avatar } from "@/app/_sections/kanban/components/kanban-avatar";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {usePopover} from "@/hooks/usePopover";
import {AssigneeSchemaType} from "@/app/_sections/kanban/task-view/task-view-form";


type Props = {
	values: AssigneeSchemaType[],
	handleValues: (value: AssigneeSchemaType) => void;
}
export const Assignees = ({ values, handleValues }: Props) => {
	//
  const {open, onToggle, onOpen, ref} = usePopover();
	const inputRef = useRef<HTMLInputElement>(null)
	const [search, setSearch] = useState("");
	//
	const getSelected = useCallback(
		(assignee: AssigneeSchemaType) => values.some((value) => value.id === assignee.id),
		[values]
	);
	//
	const filteredValues = useMemo(() => {

		return search
			? Object.values(mock_assignees).filter((a) => a.firstName.includes(search))
			: Object.values(mock_assignees);
	}, [search]);

	//
	const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		if(!open) onOpen();
		setSearch(e.target.value);
	}, [onOpen, open]);

	//
	const handleOpen = useCallback(() => {
		inputRef?.current?.focus();
		onToggle();
	}, [onToggle])


	// clean the input, always have the input focused and set the values:
	const handleSelect = useCallback((assignee: AssigneeSchemaType) => {
		inputRef?.current?.focus();
		setSearch("")
		handleValues({
			id: assignee.id,
			firstName: assignee.firstName,
			lastName: assignee.lastName,
		})
	}, [handleValues])
	return (
		<div ref={ref} className=" grid w-full items-center gap-2">
			<Label >Who is this task for?</Label>
			<div className="relative">
				<div
					onClick={handleOpen}
					tabIndex={0}
					className={cn(
						'flex flex-wrap rounded-md items-center p-2 min-h-10 border border-input  gap-1',
						open && "ring-1 ring-ring"
					)}
				>
					{values.map((value) => (
						<Chip
							key={value.id}
							title={`${value.firstName} ${value.lastName.charAt(0)}`}
							onRemove={() => {
								setSearch("")
								handleValues(value)
							}}
						/>
					))}
					<input
						onClick={(e) => e.preventDefault()}
						ref={inputRef}
						onChange={handleSearch}
						value={search}
						className="ml-1 flex-1 bg-transparent cursor-text outline-none placeholder-foreground-muted placeholder:font-light"
						placeholder="Search Employee..."
					/>
				</div>
				{open && (
					<div
						style={{top: '110%'}}
						className="w-full absolute left-0 flex gap-1 flex-col shadow-2xl p-3  max-h-[300px] overflow-y-auto border border-input rounded-md  bg-surface-600">
						<Empty title="Νο assignees match the search..."  isEmpty={filteredValues.length > 0}/>
						{filteredValues.map((assignee) => {
							const isSelected = getSelected(assignee);
							return (
								<div
									key={assignee.id}
									onClick={() => {
										handleSelect ({
											id: assignee.id,
											firstName: assignee.firstName,
											lastName: assignee.lastName,
										})
									}}
									className={cn(
										'flex rounded cursor-pointer hover:bg-surface-400 transition-colors ease-in gap-1 p-2',
										isSelected && 'bg-surface-500'
									)}
								>
									<div className="flex gap-2 flex-1">
										<Avatar initials={assignee?.initials} color={assignee.avatarColor} />
										<span className={cn(
											!isSelected && "text-muted-foreground",
										)}>
                    {`${assignee.firstName} ${assignee.lastName}`}
                  </span>
									</div>
									<Checkbox checked={isSelected} />
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};


const Empty = ({isEmpty, title}: {isEmpty: boolean, title: string}) => {
	if(isEmpty) return null;
	return (
		<div className="bg-surface-300 rounded-sm flex items-center justify-center p-2">
			<span className="text-muted-foreground">{title}</span>
		</div>
	)
}

const Checkbox = ({ checked }: {checked: boolean}) => {
	if (!checked) return null;
	return (
		<div className="border w-6 h-6 bg-surface-200 rounded-full flex items-center justify-center transition">
			<Check className="text-amber-100" size={13} />
		</div>
	);
};

const Chip = ({ title, onRemove }: {title: string, onRemove: () => void}) => {
	return (
		<div className="flex items-center gap-2 bg-surface-100 p-1 rounded-full px-2">
			<p className="text-sm font-light">{title}</p>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onRemove();
				}}
				className="border  outline-none cursor-pointer bg-surface-500 rounded-full w-5 h-5 flex items-center justify-center"
			>
				<X size={12} className="text-muted-foreground" />
			</button>
		</div>
	);
};

export default Assignees;
