'use client';
import {BreadCrumbs} from "@/app/_components/breadcrumbs";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, ListFilter} from "lucide-react";
import {ReactNode, useState} from "react";
import {IKanbanColumn, ITask} from "@/app/types/kanban";
import {Container} from "@/app/_sections/kanban/components/container";
import {KanbanCard} from "@/app/_sections/kanban/components/kanban-card";


type Props = {
	kanbanId: string
}



const TASKS = {
	"task-1": {
		id: "task-1",
		title: "Task 1",
		description: "Description for task 1",
		priority: 'high',
		comments: 2,
		attachments: 2,
		contributors: [
			{
				id: 200,
				name: 'Angela',
				image: '/profile.jpg'
			},	{
				id: 201,
				name: 'Vasilis',
				image: '/profile-2.jpg'
			}
		]
	},
	"task-2": {
		id: "task-2",
		title: "Task 2",
		comments: 2,
		description: "Description for task 2",
		priority: 'medium',
		attachments: 4,
		contributors: [
				{
				id: 202,
				name: 'Vasilis',
				image: '/profile-4.jpg'
			}
		]
	},
}

const INITIAL_STATE = {
	columns: {
		'open': {
			id: 'open',
			color: 'yellow',
			title: 'open',
			taskIds: ['task-1']

		},
		'progress': {
			id: 'progress',
			color: 'orange',
			title: 'progress',
			taskIds: ['task-2']
		},
		'done': {
			id: 'done',
			title: 'done',
			color: 'green',
			taskIds: []
		}
	},
	tasks: TASKS,
	columnOrder: ["open", "progress", "done"]
}


type KanbanState = {
	columns: Record<string, IKanbanColumn>;
	tasks:Record<string, ITask>;
	columnOrder: string[];
};
export function KanbanView({kanbanId: tab}: Props){
	const [kanban, setKanban] = useState<KanbanState>(INITIAL_STATE)
	console.log({kanban})
	return (
		<main
			style={{height: 'calc(100vh - 50px)'}}
			className="w-[95%] mx-auto grid grid-rows-[auto_auto_1fr]"
		>
			<BreadCrumbs tab={tab} />
			<div className=" flex flex-colo gap-2 items-center mb-1 mt-2">
				<GhostButton>
					<ListFilter />
					filter
				</GhostButton>
				<GhostButton>
					<ArrowUpDown />
					sort
				</GhostButton>
			</div>
			<div className="pb-4 pt-1  overflow-hidden flex flex-row gap-2 overflow-x-auto">
				{
					Object.entries(kanban.columns).map(([key, column]) => {
						return (
							<Container  key={key} column={column}  >
								{kanban.columns[key].taskIds.map((taskId, index) => {
									return (
										<KanbanCard key={index} item={kanban.tasks[taskId]} />
									)
								})}
							</Container>
						)
					})
				}
			</div>
		</main>
	);
}











type GhostButtonProps = {
	children: ReactNode;
}
export function GhostButton({children}: GhostButtonProps) {
	return (
		<Button className="text-muted px-2 tracking-wide hover:bg-card" variant="ghost">
			{children}
		</Button>
	)
}



