import { model, models, Schema } from 'mongoose'

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

export const Project = models.Project || model('Project', ProjectSchema)
