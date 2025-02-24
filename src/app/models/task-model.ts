import { Schema, model, models } from 'mongoose'

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    startData: { type: String },
    dueDate: { type: String },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to Project
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
  },
  { timestamps: true }
)

export const Task = models.Task || model('Task', TaskSchema)
