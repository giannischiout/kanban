import { Task } from '@/app/models/task-model'

import { IProject, Project } from '@/app/models/project-model'
import { NextResponse } from 'next/server'
import { handleError } from '@/app/api/_utils/error-handler'
import connectDB from '@/lib/mongo-config'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params)?.slug
  console.log({ slug })
  try {
    await connectDB()
    const project = await Project.findOne({ slug }).lean<IProject | null>()

    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }

    const taskIds = project.columns.flatMap((column) => column.taskIds)
    const tasks = await Task.find({ _id: { $in: taskIds } }).lean()
    const columnsWithTasks = project.columns.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.columnId.toString() === column._id.toString()),
    }))
    const projectWithTasks = { ...project, columns: columnsWithTasks }

    return NextResponse.json({
      result: projectWithTasks,
      success: true,
      message: 'Projects fetched successfully',
    })
  } catch (e) {
    console.log({ e })
    return handleError(e, 'Error fetching project')
  }
}