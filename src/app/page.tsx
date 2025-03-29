import { cache } from 'react'
import axios, { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import { ApiSingleResponse } from '@/app/types/api'
import { Project } from '@/app/types/project'

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}`

const getProject = cache(async (): Promise<ApiSingleResponse<Project | null>> => {
  try {
    const { data } = await axios.get(`${ENDPOINT}/project/get-first-project`)
    return {
      success: true,
      result: data.result,
      message: data.message,
    }
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    return {
      success: false,
      result: {} as Project,
      message: axiosError.response?.data?.message || 'Failed to fetch projects',
    }
  }
})

export default async function Home() {
  const { success, result } = await getProject()

  if (!success || !result?.slug) {
    redirect('/projects')
  }
  redirect(`/projects/${encodeURIComponent(result?.slug)}/board`)
}