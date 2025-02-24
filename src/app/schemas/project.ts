import { z } from 'zod'
import mongoose from 'mongoose'

/** Base Schema (used for both frontend & backend) */
export const projectSchema = z.object({
  _id: z.string().optional(), // Only needed for backend
  name: z.string().min(3, 'Project name is required'),
  description: z.string().optional(),
  createdBy: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), 'Invalid user ID'),
  members: z.array(z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), 'Invalid member ID')),
  createdAt: z.date().optional(), // Backend-only
  updatedAt: z.date().optional(), // Backend-only
})

/** Backend Type */
export type IProjectServer = z.infer<typeof projectSchema>

/** Frontend Type (No _id or timestamps) */
export type IProjectClient = Omit<IProjectServer, '_id' | 'createdAt' | 'updatedAt'>
