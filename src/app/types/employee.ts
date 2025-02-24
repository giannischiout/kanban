export type Employee = {
  _id: string // MongoDB ObjectId as a string
  firstName: string
  lastName: string
  avatarColor: string
  initials: string
  email: string
  role: string // e.g., 'member', 'admin'
  position: string
  department: string
  projects: string[] // Array of project IDs or names
  assignedTasks: string[] // Array of task IDs or descriptions
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}