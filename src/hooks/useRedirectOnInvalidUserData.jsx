import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRedirectOnInvalidUserData = (userData, callback) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData.name || !userData.surname) {
      console.warn('Form is empty. Redirecting to home...')

      if (callback) {
        callback()
      }
    }
  }, [userData, navigate])
}
