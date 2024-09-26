import { defineStore } from 'pinia'
import { fetchPhotos } from '../api'
import { useQuery } from '@tanstack/vue-query'
import type { Photo } from '@/utils'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const queryKey = ref('african')
  const selectedPhoto = ref<Photo | null>(null)

  const { isError, data, error, isLoading, refetch, isFetching } = useQuery<Photo[]>({
    queryKey: [queryKey],
    queryFn: () => fetchPhotos(queryKey.value),
    staleTime: 1000
  })

  const setQueryKey = (newQuery: string) => {
    queryKey.value = newQuery
    refetch()
  }

  return {
    isLoading,
    isError,
    data,
    error,
    setQueryKey,
    isFetching,
    selectedPhoto
  }
})
