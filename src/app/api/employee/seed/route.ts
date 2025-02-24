import connectDB from '@/lib/mongo-config'
import { NextResponse } from 'next/server'
import { Employee } from '@/app/models/employee-model'

const assigneeColors: Record<string, string> = {
  Ethan: '#c3a60d',
  Sophia: '#1E90FF',
  Liam: '#32CD32',
  Isabella: '#8A2BE2',
  Noah: '#FF4500',
  Ava: '#FFA500',
  Mason: '#FF69B4',
  Olivia: '#4682B4',
  Elijah: '#20B2AA',
  Charlotte: '#A52A2A',
  James: '#17A2B8',
  Emma: '#007BFF',
  Oliver: '#007BFF',
  Mia: '#FFC300',
}

export const employees = [
  {
    firstName: 'Ethan',
    lastName: 'Reynolds',
    avatarColor: assigneeColors.Ethan,
    email: 'ethan@atom.dev',
    role: 'member',
    initials: 'ER',
    department: 'Engineering',
    position: 'Junior Developer',
  },
  {
    firstName: 'Sophia',
    lastName: 'Carter',
    email: 's.carter@atom.dev',
    avatarColor: assigneeColors.Sophia,
    role: 'member',
    initials: 'SC',
    department: 'Engineering',
    position: 'Senior Developer',
  },
  {
    firstName: 'Liam',
    lastName: 'Patel',
    email: 'patel@atom.dev',
    avatarColor: assigneeColors.Liam,
    role: 'member',
    initials: 'LP',
    department: 'Backend',
    position: 'Lead Developer',
  },
  {
    firstName: 'Isabella',
    lastName: 'Nguyen',
    email: 'isabella@atom.dev',
    avatarColor: assigneeColors.Isabella,
    role: 'member',
    initials: 'IN',
    department: 'Design',
    position: 'UI/UX Designer',
  },
  {
    firstName: 'Noah',
    lastName: 'Kim',
    avatarColor: assigneeColors.Noah,
    email: 'noah@atom.dev',
    role: 'member',
    initials: 'NK',
    department: 'Mobile',
    position: 'Mobile App Developer',
  },
  {
    firstName: 'Ava',
    lastName: 'Martinez',
    avatarColor: assigneeColors.Ava,
    email: 'martinez@atom.dev',
    role: 'member',
    initials: 'AM',
    department: 'Engineering',
    position: 'Software Developer',
  },
  {
    firstName: 'Mason',
    lastName: 'Rivera',
    avatarColor: assigneeColors.Mason,
    email: 'rivera@atom.dev',
    role: 'member',
    initials: 'MR',
    department: 'Operations',
    position: 'DevOps Lead',
  },
  {
    firstName: 'Olivia',
    lastName: 'Hernandez',
    avatarColor: assigneeColors.Olivia,
    role: 'member',
    email: 'olivia@atom.dev',
    initials: 'OH',
    department: 'Cloud',
    position: 'Cloud Engineer',
  },
  {
    firstName: 'Elijah',
    lastName: 'Gomez',
    avatarColor: assigneeColors.Elijah,
    email: 'elijah@atom.dev',
    role: 'member',
    initials: 'EG',
    department: 'Security',
    position: 'Security Analyst',
  },
  {
    firstName: 'Charlotte',
    lastName: 'Bennett',
    email: 'bennet@atom.dev',
    avatarColor: assigneeColors.Charlotte,
    role: 'member',
    initials: 'CB',
    department: 'AI/ML',
    position: 'AI Researcher',
  },
]

export async function POST() {
  await connectDB()
  await Employee.deleteMany()
  const result = await Employee.insertMany(employees)
  return NextResponse.json({ result })
}
