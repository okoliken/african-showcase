import { defineStore } from 'pinia'
import { fetchPhotos } from '../api'
import { useQuery } from '@tanstack/vue-query'
import type { Photo } from '@/utils'

export const useDataStore = defineStore('data', () => {
  const queryKey = 'african'

  const { isError, data, error, isLoading } = useQuery<Photo[]>({
    queryKey: [queryKey],
    queryFn: () => fetchPhotos(),
    staleTime: 1000
  })

  return {
    isFetching: isLoading,
    isError,
    data,
    error
  }
})
