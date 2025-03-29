import { model, models, Schema, Types } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  startDate: string
  dueDate: string
  projectId: Types.ObjectId
  columnId: Types.ObjectId
  order: number
  assignedTo: Types.ObjectId
  collaborators: Types.ObjectId[]
  attachments: {
    filename: string
    url: string
    uploadedAt: Date
  }[]
  comments: {
    userId: Types.ObjectId
    text: string
    createdAt: Date
  }[]
  subtasks: Types.ObjectId[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    startData: { type: String },
    dueDate: { type: String },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Employee', required: true }, // Single user assigned
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'Employee' }], // Multiple collaborators
    attachments: [
      {
        filename: { type: String },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }],
    column: String,
    tags: [{ type: String }],
  },
  { timestamps: true }
)

TaskSchema.index({ columnId: 1, order: 1 }, { unique: true })
TaskSchema.index({ projectId: 1 })

export const Task = models.Task || model<ITask>('Task', TaskSchema)
