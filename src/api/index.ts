import type { Photo } from '@/utils'

export async function fetchPhotos(query = 'African', width = 800, height = 600): Promise<Photo[]> {
  const url = `https://api.unsplash.com/search/photos?query=${query.toLowerCase()}&per_page=8&client_id=${import.meta.env.VITE_API_BASE_KEY}&w=${width}&h=${height}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  return data.results
}
