interface UnsplashResponse {
  urls?: {
    regular?: string
  }
}

class ApiService {
  private apiKey: string
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('ApiService requires  API key.')
    }

    this.apiKey = apiKey
  }

  async fetchRandomImage(query: string): Promise<string | null> {
    if (!query)
      throw new Error('Query parameter is required for fetching images.')

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${query}&client_id=${this.apiKey}`,
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }
      const data: UnsplashResponse = await response.json()
      return data?.urls?.regular || null
    } catch (error) {
      console.error('Error fetching image:', error)
      throw error
    }
  }
}

const UNSPLASH_API_KEY: string = import.meta.env.VITE_UNSPLASH_API_KEY as string

export const unsplashService = new ApiService(UNSPLASH_API_KEY)
