

export type IContributor = {
	id: number;
	image: string;
	name: string;
}


export type ITask =  {
	title: string;
	id: string;
	description: string;
	comments: number;
	priority: string;
	attachments?: number;
	contributors?: IContributor[]
}


export type IKanbanColumn = {
	id: string;
	title: string;
	taskIds: string[];
	color: string;
}