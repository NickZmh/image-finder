class ApiService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('ApiService requires  API key.')
    }

    this.apiKey = apiKey
  }

  async fetchRandomImage(query) {
    if (!query)
      throw new Error('Query parameter is required for fetching images.')

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${query}&client_id=${this.apiKey}`,
      )
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }
      const data = await response.json()
      return data?.urls?.regular || null
    } catch (error) {
      console.error('Error fetching image:', error)
      throw error
    }
  }
}

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

export const unsplashService = new ApiService(UNSPLASH_API_KEY)
