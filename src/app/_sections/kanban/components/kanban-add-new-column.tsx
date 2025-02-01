'use client'

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Plus} from "lucide-react";
import {ColorPicker} from "@/app/_components/color-picker";
import {useCallback, useState} from "react";

type Props = {
	onColumnAdd: (label: string, color: string) => void;
}

type StateProps = {
	color: string;
	label: string;
}
export function AddColumnDialog({onColumnAdd}: Props) {
	const [state, setState] = useState<StateProps>({
		color: '',
		label: '',
	})

	const handleChange = useCallback((label: keyof StateProps, value: string) => {
			setState(prev => ({...prev, [label]: value}))
	}, [])

	const handleSubmit = useCallback(() => {
		onColumnAdd(state.color, state.label)
	}, [state, onColumnAdd])
	return (
		<Dialog >
			<DialogTrigger asChild>
				<Button size="iconMedium" variant="card">
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-auto ">
				 <div className="flex-col flex gap-3">
					 <DialogHeader>
						 <DialogTitle>Add new column</DialogTitle>
						 <DialogDescription>
							  Click save when you&#39;re done.
						 </DialogDescription>
					 </DialogHeader>
					 <div className="flex flex-col gap-5 mt-2">
						 <div className="grid w-full max-w-sm items-center gap-2">
							 <Label htmlFor="email">Label:</Label>
							 <Input onChange={(e) => handleChange('label', e.target.value )} type="label" id="label" placeholder="Column label"/>
						 </div>
						 <div className="grid w-full max-w-sm items-center gap-2">
							 <Label htmlFor="email">Color:</Label>
							 <ColorPicker
								 color={state.color}
								 onChange={(color) => handleChange('color', color )}
							 />
						 </div>
					 </div>
					 <DialogFooter>
						 <Button  onClick={handleSubmit} type="submit">Save changes</Button>
					 </DialogFooter>
				 </div>
			</DialogContent>
		</Dialog>
	)
}
