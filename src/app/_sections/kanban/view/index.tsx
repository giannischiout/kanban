'use client';
import {BreadCrumbs} from "@/app/_components/breadcrumbs";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, ListFilter} from "lucide-react";
import {ReactNode,  useCallback, useMemo, useState} from "react";
import {Container} from "@/app/_sections/kanban/components/container";
import {KanbanCard} from "@/app/_sections/kanban/components/kanban-card";

import {closestCenter, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, UniqueIdentifier, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy,} from "@dnd-kit/sortable";
import {restrictToHorizontalAxis} from '@dnd-kit/modifiers';
import {AddColumnDialog} from "@/app/_sections/kanban/components/kanban-add-new-column";
import {SmartPointerSensor} from "@/app/_sections/kanban/components/smart-pointer";

type Props = {
	kanbanId: string
}




import {TaskViewSheet} from "@/app/_sections/kanban/task-view/task-view-sheet";
import {usePopover} from "@/hooks/usePopover";
import {ActiveState, Column, KanbanState} from "@/app/types/kanban";
import {INITIAL_KANBAN_STATE} from "@/app/_actions/tasks";

// ======================================================== =========================================
// ======================================== DND KANBAN VIEW =========================================
// ======================================================== =========================================

export function KanbanView() {
	const [viewTaskId, setViewTaskId] = useState("")

	const [kanban, setKanban] = useState<KanbanState>(INITIAL_KANBAN_STATE)
	const sheet = usePopover()

	const [active, setActive] = useState<ActiveState>({
		id: '',
		type: '',
		columnId: '',
	})
	const sensors = useSensors(
		useSensor(SmartPointerSensor),
	);


	const handleDragStart = useCallback((event: DragStartEvent) => {
		const {id} = event.active;
		const type = event?.active?.data?.current?.type;
		const columnId = event?.active?.data?.current?.columnId;

		setActive(prev => ({...prev, id, type, columnId: columnId ?? ""}))
	}, [])


	const handleDragEnd = useCallback((event: DragEndEvent) => {
		const {active, over} = event;
		if (!over?.id || active.id === over.id) return;
		//
		const activeType = active?.data?.current?.type;
		const overType = over?.data?.current?.type;
		const actionType = getType(activeType, overType);

		if(actionType === 'isColumn') {
			const oldIndex = kanban.columnOrder.indexOf(active.id as string)
			const newIndex = kanban.columnOrder.indexOf(over?.id as string)

			const newOrder = arrayMove(kanban.columnOrder, oldIndex, newIndex)
			setKanban((prev) => ({...prev, columnOrder: newOrder}))
		}
		if(actionType === 'isItem') {
			// get columns:
			const activeColumn = active?.data.current?.columnId;
			const activeTasks = kanban.columns[activeColumn].taskIds
			// get item indexes:
			const activeIndex = findItemIndex(activeTasks, active?.id)
			const overIndex = findItemIndex(activeTasks, over?.id)
			// use dnd-kit helper function to reorder array:
			const newArray = arrayMove(activeTasks, activeIndex, overIndex,);
			// update the new state:
			setKanban((prev) => {
				return {
					...prev,
					columns: {
						...prev.columns,
						[activeColumn]: {
							...prev.columns[activeColumn],
							taskIds: newArray,
						}
					}
				}
			})
 		}
	}, [kanban])

	const handleDragOver = useCallback((event: DragOverEvent) => {
			const { active, over } = event;
			const activeColumnId = active.data?.current?.columnId;
			const overColumnId = over?.data?.current?.columnId;
			const activeType = active.data?.current?.type;


			if(!overColumnId) return;
			if (activeType === 'item' && activeColumnId !== overColumnId) {
				console.log('drag over item')
				console.log({activeColumnId})
				console.log({overColumnId})
				console.log({activeType})
				const updatedActive = kanban.columns[activeColumnId].taskIds.filter(taskId => taskId !== active.id);
				const updatedOver = [...kanban.columns[overColumnId].taskIds];
				const overIndex = updatedOver.findIndex(taskId => taskId === over?.id);
				if (overIndex === -1) {
					updatedOver.push(active.id.toString());
				} else {
					updatedOver.splice(overIndex, 0, active.id.toString());
				}

				setKanban((prev) => ({
					...prev,
					columns: {
						...prev.columns,
						[activeColumnId]: {
							...prev.columns[activeColumnId],
							taskIds: updatedActive,
						},
						[overColumnId]: {
							...prev.columns[overColumnId],
							taskIds: updatedOver,
						},
					},
				}));
			}
		}, [kanban.columns]
	);
	const modifiers = useMemo(() => getModifiers(active?.type), [active?.type]);

	const handleOpenSheet = (newTaskId: string) => {
		sheet.onOpen();
		setViewTaskId(newTaskId)
	}

	const onColumnAdd = useCallback(( color: string, label: string,) => {
		setKanban((prev) => ({
		    ...prev,
				columnOrder: [...prev.columnOrder, label],
			  columns: {
					...prev.columns,
					[label]: {
						color,
						id: label,
						title: label,
						taskIds: []
					}
				}
		}))
	}, [])
	return (
		<main
			className="w-[95%] min-h-[100vh]  mx-auto grid grid-rows-[auto_auto_1fr]"
		>
			<div className=" flex flex-colo gap-2 items-center mb-1 mt-2">
				<GhostButton>
					<ListFilter/>
					filter
				</GhostButton>
				<GhostButton>
					<ArrowUpDown/>
					sort
				</GhostButton>
			</div>
			<DndContext
				id='dnd-kanban'
				modifiers={modifiers}
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
			>
				<SortableContext items={kanban.columnOrder} strategy={horizontalListSortingStrategy}>
					<div className="pb-4 pt-1  overflow-hidden flex flex-row gap-4 overflow-x-auto">
						{kanban.columnOrder.map((columnId) => {
							const column = kanban.columns[columnId]
							return (
								<Container key={columnId} column={column} id={columnId}>
									<SortableContext items={column.taskIds || []} strategy={verticalListSortingStrategy}>
										{column.taskIds.map((taskId) => (
												<KanbanCard
													key={taskId}
													handleOpenSheet={() => handleOpenSheet(taskId)}
													active={active}
													id={taskId}
													columnId={columnId}
													item={kanban.tasks[taskId]}
												/>
											))}
									</SortableContext>
								</Container>
							)
						})}
						<AddColumnDialog onColumnAdd={onColumnAdd} />
					</div>
				</SortableContext>
				<DragOverlay>
					 <>
						 {
							 active.id && active.type === 'column' && (
								 <Container column={kanban.columns[active.id]} id={active.id}>
									 {kanban.columns[active.id].taskIds.map((taskId) => {
										 return (
											 <KanbanCard key={taskId} columnId={active.id.toString()} id={taskId} item={kanban.tasks[taskId]}/>
										 )
									 })}
								 </Container>
							 )

						 }
						 {
							 active.id && active.type === 'item' && (
								 <KanbanCard  key={active.id} columnId={active.columnId}  id={active.id.toString()} item={kanban.tasks[active.id]}/>
							 )
						 }
					 </>
				</DragOverlay>
			</DndContext>
			{/*<TaskViewSheet taskId={viewTaskId} open={sheet.open} onClose={sheet.onClose}/>*/}
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



// helper functions:
const getType = (activeType?: string, overType?: string): string | undefined => {
	if (activeType === "item" && overType === "item") return "isItem";
	if (activeType === "column" && overType === "column") return "isColumn";
	return undefined;
};

const getModifiers = (type: string | null) => {
	if (type === 'column') {
		return [restrictToHorizontalAxis]; // Restrict movement to horizontal axis for columns
	} else {
		return []; // No restrictions, allowing free movement for kanban cards
	}
};

const findItemIndex = (array: Column['taskIds'], key:UniqueIdentifier) => {
	return array.findIndex(itemId => itemId === key.toString())
}
