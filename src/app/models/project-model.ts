import { Task } from '@/app/models/task-model'

import { Document, model, models, Schema, Types } from 'mongoose'

export interface IColumn {
  _id: Types.ObjectId
  name: string
  color: string
  taskIds: Types.ObjectId[]
}

export interface IProject extends Document {
  _id: Types.ObjectId
  name: string
  color: string
  slug: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed'
  startDate?: Date
  endDate?: Date
  columns: IColumn[]
  createdAt: Date
  updatedAt: Date
}

const ColumnSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  { timestamps: true, _id: true } // Ensures _id is automatically created
)

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: '#B0B0B0' },
    slug: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    startDate: { type: Date },
    endDate: { type: Date },
    columns: [ColumnSchema],
  },
  { timestamps: true }
)
ProjectSchema.index({ slug: 1 }, { unique: true })

export const Project = models.Project || model<IProject>('Project', ProjectSchema)
