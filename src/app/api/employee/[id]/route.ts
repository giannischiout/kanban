import connectDB from '@/lib/mongo-config'
import { Employee } from '@/app/models/employee-model'
import { NextResponse } from 'next/server'
import { handleError } from '@/app/api/_utils/error-handler'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const _id = (await params).id

  await connectDB()
  try {
    const result = await Employee.findOne({ _id })
    return NextResponse.json({
      result,
      success: true,
      message: 'Employees fetched successfully',
    })
  } catch (e) {
    return handleError(e, 'Error fetching Employee')
  }
}