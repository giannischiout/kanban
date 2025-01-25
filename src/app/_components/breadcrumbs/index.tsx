import {ChevronDown, ChevronRight, Folder} from "lucide-react";

export function BreadCrumbs({tab}: {tab: string}) {
	return (
		<div className="pt-6 pb-3 w-full flex items-center gap-2">
			<div className="cursor-pointer bg-card px-3 py-1.5 rounded-md flex items-center gap-4">
				<div className="flex items-center gap-1.5">
					<Folder  size={14}/>
					<p className="text-sm">Agency</p>
				</div>
				<ChevronDown size={16} className="text-muted-card" />
			</div>
			<ChevronRight className="text-muted-card" size={18} />
			<p>{tab}</p>
		</div>
	)
}