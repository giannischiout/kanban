import connectDB from '@/lib/mongo-config'
import { NextResponse } from 'next/server'
import { Project } from '@/app/models/project-model'
import { handleError } from '@/app/api/_utils/error-handler'

export async function GET() {
  await connectDB()

  try {
    const result = await Project.find()
    return NextResponse.json({
      result,
      success: true,
      message: 'Projects fetched successfully',
    })
  } catch (e) {
    return handleError(e, 'Error fetching projects') // Use the helper function here
  }
}
