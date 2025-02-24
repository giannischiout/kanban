import { Schema, model, models, InferSchemaType } from 'mongoose'

const EmployeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatarColor: String,
    initials: String,
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'manager', 'member'], default: 'member' },
    position: { type: String, required: true },
    department: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project', required: false }],
    assignedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task', required: false }],
  },
  { timestamps: true }
)

export type IEmployeeSchema = InferSchemaType<typeof EmployeeSchema>

export const Employee = models.Employee || model('Employee', EmployeeSchema)
