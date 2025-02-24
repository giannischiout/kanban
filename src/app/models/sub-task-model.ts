import { Schema, model, models } from 'mongoose'

export interface ISubtask extends Document {
  title: string
  status: 'todo' | 'in-progress' | 'done'
  taskId: Schema.Types.ObjectId // Reference to Task document
  createdAt?: Date // Optional because it's handled automatically by MongoDB
  updatedAt?: Date // Optional because it's handled automatically by MongoDB
}

const SubtaskSchema = new Schema<ISubtask>(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true }, // Reference to the parent task
  },
  { timestamps: true }
)

export const Subtask = models.Subtask || model('Subtask', SubtaskSchema)
