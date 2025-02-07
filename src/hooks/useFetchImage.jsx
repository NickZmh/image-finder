import { useState, useCallback } from 'react'
import { unsplashService } from '../services'

export const useFetchImage = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchImage = useCallback(
    async (searchCategory) => {
      if (!searchCategory) return
      setIsLoading(true)
      setError(null)

      try {
        const image = await unsplashService.fetchRandomImage(searchCategory)

        if (image) {
          setImageUrl(image)
        }
      } catch (error) {
        console.error('Error fetching image:', error)
        setError('Failed to load the image. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [setImageUrl, setImageUrl],
  )

  return { imageUrl, isLoading, error, fetchImage }
}
