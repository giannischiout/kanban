import connectDB from '@/lib/mongo-config'
import { Employee } from '@/app/models/employee-model'
import { NextResponse } from 'next/server'
import { handleError } from '@/app/api/_utils/error-handler'

export async function GET() {
  await connectDB()

  try {
    const result = await Employee.find()
    return NextResponse.json({
      result,
      success: true,
      message: 'Employees fetched successfully',
    })
  } catch (e) {
    return handleError(e, 'Error fetching Employee')
  }
}
