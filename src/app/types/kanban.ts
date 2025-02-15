// Type for Assignee
import {UniqueIdentifier} from "@dnd-kit/core";

export type Assignee = {
	id: number;
	firstName: string;
	lastName: string;
	avatarColor: string;
	role: string;
	initials: string;
};


// Define a comment type
export type Comment =  Assignee & {
	text: string;
};


// Define an individual attachment type
export type Attachment = {
	id: number;
	name: string;
	url: string;
};


// Define a task type
export type Task = {
	id: string;
	title: string;
	description: string;
	priority: "low" | "medium" | "high";
	color: string;
	status?: "open" | "progress" | "done";
	dueDate: string;
	createdAt: string;
	updatedAt: string;
	comments: Comment[];
	attachments: Attachment[];
	contributors: Assignee[];
};



// Define a column type
export type Column = {
	id: string;
	title: string;
	color: string;
	taskIds: string[];
};

// Define the Kanban board state type
export type KanbanState = {
	columns: Record<string, Column>;
	tasks: Record<string, Task>;
	columnOrder: string[];
};


export type ActiveState = {
	id: UniqueIdentifier;
	type: 'column' | 'item' | '';
	columnId: string;
}

