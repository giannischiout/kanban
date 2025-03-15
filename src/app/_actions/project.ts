import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Project } from '@/app/types/project'
import { cache } from 'react'

const fetchProjectById = async (slug: string | null): Promise<ApiData> => {
  try {
    const { data } = await axios.get(`/api/project/${slug}`)
    return data
  } catch (error) {
    throw new Error('Error fetching project')
  }
}

export type ApiData = {
  result: Project
  success: boolean
  message: string
}

export const useGetProject = (slug: string | null) => {
  const { data, error, isLoading, isError, isSuccess } = useQuery<ApiData, Error>({
    queryKey: ['project', slug],
    queryFn: () => fetchProjectById(slug),
    enabled: !!slug,
  })

  return {
    project: data?.result || null,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export type GetProjects = {
  success: boolean
  result: Project[]
  message: string
}

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/project`
export const getProjects = cache(async (): Promise<GetProjects> => {
  try {
    const { data } = await axios.get(ENDPOINT)
    return {
      success: true,
      result: data.result,
      message: data.message,
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return error
  }
})