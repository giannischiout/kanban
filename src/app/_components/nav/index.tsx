'use client';
import {Bell,  ChevronDown, ChevronLeft, ChevronRight, CopyPlus, House, Settings, X} from "lucide-react";
import { useCallback, useState} from "react";
import {IconButton} from "@/app/_components/icon-button";
import Image from "next/image";
import {Tab} from "@/app/_components/Tab";
import {useRouter} from "next/navigation";


const SAVED_TABS = ['example', 'newkanban', 'test']


const handleNewTab = (initialState: string[] , activeTab: string) => {
	if(!initialState.includes(activeTab)) {
		 return [ activeTab, ...initialState,]
	}
	return initialState;
}

type StateProps = {
	tabs: string[];
	active: string;
}
export function Navbar({tab}: {tab: string}) {

	const router = useRouter()
	const [state, setState] = useState<StateProps>({
		tabs:  handleNewTab(SAVED_TABS, tab),
		active: tab,
	})

	const handleActive = useCallback((active: string) => {
		setState((prev) => ({...prev, active}))
		router.push(`/kanban/${active}`)
	}, [router])

	const handleClearTab = useCallback((clickedTab: string) => {
		setState((prev) => ({...prev, tabs: prev.tabs.filter(tab => tab !== clickedTab)}))
	}, [tab])

	return (
		<nav className="px-4 h-[50px] grid  grid-cols-[1fr_auto] items-center justify-between w-full z-20 bg-surface border-b border-border">
			{/* First column: Icons */}
			<div className="flex h-full items-center gap-1">
				<div className="flex max-w-36	 flex-1 flex-row justify-between gap-2 pr-8">
					<House size={20}/>
					<div className="flex  flex-row  gap-2">
						<ChevronLeft size={20}/>
						<ChevronRight size={20}/>
					</div>
					<CopyPlus size={20}/>
				</div>
				{/* Second column: OpenTaskFrame */}
				<div className=" h-full  flex-1 items-center  hidden tablet:flex ">
					{state.tabs.map((tab, index) => (
						<Tab
							key={tab}
							title={tab}
							handleActive={handleActive}
							handleClearTab={handleClearTab}
							active={state.active}
						/>
					))}
				</div>
			</div>


			{/* Third column: Test text */}
			<div className="h-full flex items-center gap-2">
				<IconButton size="small">
					<Bell/>
				</IconButton>
				<IconButton size="small">
					<Settings/>
				</IconButton>
				<Profile/>
			</div>
		</nav>
	);
}


export function Profile() {
	return (
		<div className="h-8 w-18  px-[4px] flex gap-1 items-center bg-card-light rounded  cursor-pointer ">
			<div className="w-6 h-6 relative ">
				<Image
					src="/avatar.jpg"
					alt="avatar"
					fill
					sizes="20px, 20px"
					objectFit="cover"
					className="rounded relative object-cover"
				/>
			</div>
			<ChevronDown size={18} className="text-muted-card" />
		</div>
	)
}




