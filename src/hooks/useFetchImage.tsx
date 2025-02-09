import { useState, useCallback } from 'react'
import { unsplashService } from '../services'
import { LOCALIZATION } from '../constants'

export const useFetchImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImage = useCallback(
    async (searchCategory: string) => {
      if (!searchCategory) return
      setIsLoading(true)
      setError(null)

      try {
        const image: string | null = await unsplashService.fetchRandomImage(
          searchCategory,
        )

        if (image) {
          setImageUrl(image)
        }
      } catch (error) {
        console.error('Error fetching image:', error)
        setError(LOCALIZATION.errorFetchingImage)
      } finally {
        setIsLoading(false)
      }
    },
    [setImageUrl, setIsLoading, setError],
  )

  return { imageUrl, isLoading, error, fetchImage }
}
