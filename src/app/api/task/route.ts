import connectDB from '@/lib/mongo-config'
import { Task } from '@/app/models/task-model'
import { NextResponse } from 'next/server'
import { handleError } from '@/app/api/_utils/error-handler'

export async function GET() {
  await connectDB()

  try {
    const result = await Task.find()
    return NextResponse.json({
      result,
      success: true,
      message: 'Task fetched successfully',
    })
  } catch (e) {
    return handleError(e, 'Error fetching projects') // Use the helper function here
  }
}
