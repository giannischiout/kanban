import { Project } from '@/app/models/project-model'
import { NextResponse } from 'next/server'
import { handleError } from '@/app/api/_utils/error-handler'
import connectDB from '@/lib/mongo-config'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params)?.slug
  console.log({ slug })
  try {
    await connectDB()
    const result = await Project.findOne().sort({ _id: 1 }) // Gets the first project
    return NextResponse.json({
      result,
      success: true,
      message: 'Projects fetched successfully',
    })
  } catch (e) {
    console.log({ e })
    return handleError(e, 'Error fetching project')
  }
}