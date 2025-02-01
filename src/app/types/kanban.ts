import {IAssignee} from "@/app/mock/assignees";


export type ITask =  {
	title: string;
	id: string;
	description: string;
	comments: number;
	priority: string;
	attachments?: number;
	contributors?: IAssignee[]
}


export type IKanbanColumn = {
	id: string;
	title: string;
	taskIds: string[];
	color: string;
}