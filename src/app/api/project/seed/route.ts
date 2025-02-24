import connectDB from '@/lib/mongo-config'
import { NextResponse } from 'next/server'
import { Project } from '@/app/models/project-model'

const data = [
  {
    name: 'AI Chatbot Development',
    description: 'Developing a customer support AI chatbot with NLP capabilities.',
    status: 'in-progress',
    startDate: '2024-01-15T00:00:00.000Z',
    endDate: '2024-06-30T00:00:00.000Z',
  },
  {
    name: 'E-commerce Platform Upgrade',
    description: 'Upgrading the backend and UI of our e-commerce platform for better performance and scalability.',
    status: 'pending',
    startDate: '2024-05-01T00:00:00.000Z',
    endDate: '2024-12-15T00:00:00.000Z',
  },
]

export async function POST() {
  await connectDB()
  await Project.deleteMany()
  const result = await Project.insertMany(data)
  return NextResponse.json({ result })
}
