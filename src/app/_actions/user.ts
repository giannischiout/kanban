import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Employee } from '@/app/types/employee'

const fetchUser = async (id: string): Promise<ApiData> => {
  try {
    const { data } = await axios.get(`/api/employee/${id}`)
    return data
  } catch (error) {
    throw new Error('Error fetching projects')
  }
}

export type ApiData = {
  result: Employee
  success: boolean
  message: string
}
export const useGetUser = (id: string | undefined) => {
  const { data, error, isLoading, isError, isSuccess } = useQuery<ApiData, Error>({
    queryKey: ['user'],
    queryFn: () => fetchUser(id || ''),
    enabled: !!id,
  })

  return {
    user: data?.result || null,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}
