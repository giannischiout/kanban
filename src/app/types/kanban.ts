// Type for Assignee
import { UniqueIdentifier } from '@dnd-kit/core'

export type Assignee = {
  id: number
  firstName: string
  lastName: string
  avatarColor: string
  role: string
  initials: string
}

// Define a comment type
export type Comment = Assignee & {
  text: string
}

// Define an individual attachment type
export type Attachment = {
  id: number
  name: string
  url: string
}

// Define a task type
export type Task = {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  color: string
  status?: 'open' | 'progress' | 'done'
  dueDate: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
  attachments: Attachment[]
  contributors: Assignee[]
}

// Define a column type
export type Column = {
  id: string
  title: string
  color: string
  taskIds: string[]
}

// Define the Kanban board state type
export type KanbanState = {
  columns: Record<string, Column>
  tasks: Record<string, Task>
  columnOrder: string[]
}

export type ActiveState = {
  id: UniqueIdentifier
  type: 'column' | 'item' | ''
  columnId: string
}


// new Types
export type ITask = {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  dueDate: string;
  projectId: string;
  columnId: string;
  order: number;
  assignedTo: string;
  collaborators: string[];
  attachments: { filename: string; url: string; uploadedAt: Date }[];
  comments: { userId: string; text: string; createdAt: Date }[];
  subtasks: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type IColumn = {
  _id: string;
  name: string;
  color: string;
  taskIds: string[];
  tasks?: ITask[];
};

export type IProject = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  startDate: Date;
  endDate: Date;
  color: string;
  slug: string;
  columns: IColumn[];
};