import { NextResponse } from 'next/server'

// Reusable error handler
export function handleError(e: unknown, message: string) {
  if (e instanceof Error) {
    console.log('ERROR: ', e)
    return NextResponse.json({
      error: e.message,
      success: false,
      message,
    })
  } else {
    return handleError(e, 'Error fetching employees') // Use the helper function here
  }
}
