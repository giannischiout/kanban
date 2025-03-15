import connectDB from '@/lib/mongo-config'
import { NextResponse } from 'next/server'
import { Project } from '@/app/models/project-model'
import { Task } from '@/app/models/task-model'
import { Employee, IEmployeeSchema } from '@/app/models/employee-model'
import { Subtask } from '@/app/models/sub-task-model'

const subtasks = [
  {
    title: 'Setup development environment',
    status: 'todo',
  },
  {
    title: 'Design homepage layout',
    status: 'in-progress',
  },
  {
    title: 'Create API endpoint for login',
    status: 'todo',
  },
  {
    title: 'Write unit tests for API',
    status: 'in-progress',
  },
  {
    title: 'Optimize frontend performance',
    status: 'done',
  },
  {
    title: 'Setup database schema',
    status: 'todo',
  },
  {
    title: 'Integrate third-party services',
    status: 'in-progress',
  },
  {
    title: 'Conduct user acceptance testing',
    status: 'done',
  },
  {
    title: 'Create documentation for API',
    status: 'todo',
  },
  {
    title: 'Fix UI responsiveness issues',
    status: 'in-progress',
  },
]

const tasks = [
  {
    title: 'Setup project environment',
    priority: 'high',
    description: 'Set up the development environment for the project.',
    assignedTo: '67b2438bb173b61528e2e2d4', // Ethan Reynolds
    startDate: '11-12-2024', // Start date as a string
    dueDate: '25-12-2024', // Due date as a string
  },
  {
    title: 'Design user interface',
    description: 'Create the basic layout for the user interface.',
    assignedTo: '67b2438bb173b61528e2e2d7', // Isabella Nguyen
    collaborators: ['67b2438bb173b61528e2e2d6'], // Liam Patel
    priority: 'medium',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '24-12-2024', // Due date as a string
  },
  {
    title: 'Backend API development',
    description: 'Develop the RESTful API for the backend.',
    assignedTo: '67b2438bb173b61528e2e2d6', // Liam Patel
    collaborators: ['67b2438bb173b61528e2e2d8'], // Noah Kim
    priority: 'high',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '20-12-2024', // Due date as a string
  },
  {
    title: 'Mobile app UI development',
    description: 'Design and implement the UI for the mobile application.',
    assignedTo: '67b2438bb173b61528e2e2d8', // Noah Kim
    collaborators: ['67b2438bb173b61528e2e2d7'], // Isabella Nguyen
    priority: 'medium',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '22-12-2024', // Due date as a string
  },
  {
    title: 'Create database schema',
    description: 'Design the database schema for the project.',
    assignedTo: '67b2438bb173b61528e2e2d6', // Liam Patel
    collaborators: ['67b2438bb173b61528e2e2d9'], // Ava Martinez
    priority: 'high',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '18-12-2024', // Due date as a string
  },
  {
    title: 'API authentication implementation',
    description: 'Implement user authentication for the API.',
    assignedTo: '67b2438bb173b61528e2e2d4', // Ethan Reynolds
    collaborators: ['67b2438bb173b61528e2e2db'], // Olivia Hernandez
    priority: 'high',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '17-12-2024', // Due date as a string
  },
  {
    title: 'User testing and feedback',
    description: 'Conduct user testing and collect feedback.',
    assignedTo: '67b2438bb173b61528e2e2d7', // Isabella Nguyen
    collaborators: ['67b2438bb173b61528e2e2d5'], // Sophia Carter
    priority: 'medium',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '23-12-2024', // Due date as a string
  },
  {
    title: 'Security audit',
    description: 'Perform a security audit on the backend.',
    assignedTo: '67b2438bb173b61528e2e2dc', // Elijah Gomez
    collaborators: ['67b2438bb173b61528e2e2d6'], // Liam Patel
    priority: 'high',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '16-12-2024', // Due date as a string
  },
  {
    title: 'Deployment setup',
    description: 'Set up the production deployment for the project.',
    assignedTo: '67b2438bb173b61528e2e2d9', // Ava Martinez
    collaborators: ['67b2438bb173b61528e2e2d8'], // Noah Kim
    priority: 'medium',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '21-12-2024', // Due date as a string
  },
  {
    title: 'Final project review',
    description: 'Conduct a final review of the project.',
    assignedTo: '67b2438bb173b61528e2e2d5', // Sophia Carter
    collaborators: ['67b2438bb173b61528e2e2d4'], // Ethan Reynolds
    priority: 'low',
    startDate: '11-12-2024', // Start date as a string
    dueDate: '26-12-2024', // Due date as a string
  },
]

export async function POST() {
  await connectDB()

  const projects = await Project.find().limit(3)
  const employees = await Employee.find()
  // assign a project to the tasks:
  const firstProjectTasks = tasks.slice(0, Math.floor(tasks.length * 0.6))
  const secondProjectTasks = tasks.slice(Math.floor(tasks.length * 0.6))

  const assignIdsToTasks = [
    ...firstProjectTasks.map((task) => ({ ...task, projectId: projects[0]._id })),
    ...secondProjectTasks.map((task) => ({ ...task, projectId: projects[1]._id })),
  ]
  //assign employees to the tasks:
  const assignees = await Employee.find()
  console.log({ assignees })

  // give tasks to the same assignee\
  // iterate through employees and randomly add 1-2 collaborators

  await Task.deleteMany()
  const result = await Task.insertMany(assignIdsToTasks)
  try {
    for (const task of result) {
      const assignedEmployee = employees[0]
      // Randomly assign 1-2 collaborators (exclude `assignedTo`)
      const availableCollaborators = employees.filter((employee) => employee._id.toString() !== assignedEmployee._id.toString())
      const randomCollaborators: IEmployeeSchema[] = []
      while (randomCollaborators.length < 2) {
        const randomEmployee = availableCollaborators[Math.floor(Math.random() * availableCollaborators.length)]
        if (!randomCollaborators.includes(randomEmployee)) {
          randomCollaborators.push(randomEmployee)
        }
      }
      await Project.updateOne(
        { _id: task.projectId }, // Filter by projectId
        {
          $push: { taskIds: task._id },
        }
      )
      // Insert subtasks and extract individual _ids
      const subtasksInserted = await Subtask.insertMany(subtasks.map((sb) => ({ ...sb, taskId: task._id })))
      await Task.updateOne(
        { _id: task._id },
        {
          $push: {
            subtasks: {
              $each: subtasksInserted.map((subtask) => subtask._id),
            },
          },
        }
      )
    }
  } catch (e) {
    console.log(e)
  }

  const updatedTasks = await Task.find()
  const subTasks = await Subtask.find()
  return NextResponse.json({
    tasks: updatedTasks,
    subTasks,
  })
}
