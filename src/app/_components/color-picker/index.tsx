import {COLORS} from "@/app/_components/color-picker/COLORS";
import {useCallback, useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

type Props = {
	color: string;
	onChange: (color: string) => void;
}
export function ColorPicker({onChange, color: newColor}: Props) {
	console.log({newColor})
	const [state, setState] = useState({
		batch: getBatch(COLORS, 0, 22),
		limit: 22,
		page: 0,
	})
	const handleBatch = useCallback((modifier: number) => {
		const batch = getBatch(COLORS, state.page + modifier, state.limit)
		setState((prev) => ({
			...prev,
			page: prev.page === 0 ? prev.page : prev.page + modifier,
			batch
		}))
	}, [state.page, state.limit])



	return (
		<div className="flex gap-2 w-full flex-wrap p-3 border border-input rounded-md">
			<div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(1.75rem,_1fr))] gap-1  overflow-auto">
				{state.batch.map((color, index) => (
					<Color
						key={`${color}-${index}`}
						onClick={(color) => onChange(color)}
						hex={color}
						active={newColor}
					/>
				))}
			</div>
			<div className="flex gap-1">
				<Button size="icon" onClick={() => handleBatch(0)}>
					<ChevronLeft/>
				</Button>
				<Button size="icon" onClick={() => handleBatch(1)}>
					<ChevronRight/>
				</Button>
				<div className="p-1 max-w-[120px] h-8 rounded-md border border-surface-300 overflow-hidden   flex items-center">
					<div className="rounded-[4px] min-w-[24px] h-full" style={{backgroundColor: newColor || "#2e2e2e"}}>
					</div>
					<input
						onChange={(e) => onChange(e.target.value)}
						placeholder="choose color"
						value={newColor}
						className="px-2 bg-transparent outline-none  text-[11px]"
					/>
				</div>
			</div>
		</div>
	);
}

const Color = ({hex, onClick, active}: { hex: string, onClick: (color: string) => void, active: string }) => {
	const isActive = active === hex;
	return (
		<div
			onClick={() => onClick(hex)}
			className={`rounded border-2  h-7 w-7 cursor-pointer hover:scale-[92%] transition-transform duration-300 ease-out ${isActive ? 'border-red-400' : ''}`}
			style={{backgroundColor: hex, borderColor: isActive ? 'white' : 'black'}}
		/>
	);
};


const getBatch = (data: typeof COLORS, page: number, limit: number) =>
	data.slice(page * limit, (page + 1) * limit)
