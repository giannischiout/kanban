import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Project } from '@/app/types/project'
import { cache } from 'react'

const fetchProjects = async (): Promise<ApiData> => {
  try {
    const { data } = await axios.get('/api/project')
    return data
  } catch (error) {
    throw new Error('Error fetching projects')
  }
}

export type ApiData = {
  result: Project[]
  success: boolean
  message: string
}
export const useGetProjects = () => {
  const { data, error, isLoading, isError, isSuccess } = useQuery<ApiData, Error>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  return {
    projects: data?.result || [],
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/project`
export const getProjects = cache(async () => {
  try {
    const { data } = await axios.get(ENDPOINT)
    return {
      success: true,
      result: data.result,
      message: 'Successfully retrieved projects',
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return error
  }
})