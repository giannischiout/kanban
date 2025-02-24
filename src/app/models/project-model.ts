import { model, models, Schema } from 'mongoose'

const ColumnSchema = new Schema(
  {
    name: { type: String, required: true }, // Name of the column (e.g., "pending", "in-progress", or custom names)
    taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // Array of Task references for each column
  },
  { timestamps: true }
)

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    startDate: { type: Date },
    endDate: { type: Date },
    columns: [ColumnSchema], // Array of columns with tasks
    taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // Referencing only Task IDs
  },
  { timestamps: true }
)

export const Project = models.Project || model('Project', ProjectSchema)
