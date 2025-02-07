import { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Box,
  CircularProgress,
  Typography,
  CardMedia,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { unsplashService } from '../../services'
import { useRedirectOnInvalidUserData } from '../../hooks'

export const ImageViewer = () => {
  const { userData, setUserData } = useAppContext()
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  useRedirectOnInvalidUserData(userData)

  const fetchImage = async (searchCategory) => {
    if (!searchCategory) return
    setLoading(true)

    try {
      const image = await unsplashService.fetchRandomImage(searchCategory)

      if (image) {
        setImageUrl(image)
        setUserData((prev) => ({ ...prev, imageUrl: image }))
      }
    } catch (error) {
      console.error('Error fetching image:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!userData.imageUrl && userData.category) {
      fetchImage(userData.category)
    }
  }, [userData.imageUrl, userData.category])

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={4}
        width="100%"
        maxWidth="600px"
      >
        <Box display="flex" justifyContent="start" mb={4} width="100%">
          <Button
            variant="outlined"
            color="default"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
        <Typography variant="h5" mb={2}>
          Choose an Image
        </Typography>

        <Box
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%', height: '490px' }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <CardMedia
              component="img"
              height="100%"
              image={imageUrl || userData.imageUrl}
              alt="Unsplash Image"
            />
          )}
        </Box>
        <Box mt={2} display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: '16px', pt: '16px', pb: '16px' }}
            onClick={() => {
              setUserData({ ...userData, imageUrl })
              navigate('/confirm')
            }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: '16px', pt: '16px', pb: '16px' }}
            onClick={() => fetchImage(userData.category)}
          >
            Reject
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
