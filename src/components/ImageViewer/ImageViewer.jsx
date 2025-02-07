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

import { useFetchImage } from '../../hooks'
import { ImageNotFound } from '../common/ImageNotFound'
import { FetchError } from '../common'

export const ImageViewer = () => {
  const { userData, setUserData } = useAppContext()
  const navigate = useNavigate()

  const { imageUrl, isLoading, error, fetchImage } = useFetchImage()

  useEffect(() => {
    if (imageUrl) {
      setUserData((prev) => ({ ...prev, imageUrl: imageUrl }))
    }
  }, [imageUrl])

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
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          sx={{ width: '100%', minHeight: '490px' }}
        >
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
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
              {isLoading && <CircularProgress />}
              {!!imageUrl && !error && !isLoading && (
                <CardMedia
                  component="img"
                  height="100%"
                  image={imageUrl || userData.imageUrl}
                  alt="Unsplash Image"
                />
              )}

              {!imageUrl && !isLoading && !error && <ImageNotFound />}
              {!isLoading && error && (
                <FetchError
                  error={error}
                  onRetry={() => fetchImage(userData.category)}
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
                disabled={!imageUrl || !userData.imageUrl}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: '16px', pt: '16px', pb: '16px' }}
                onClick={() => fetchImage(userData.category)}
                disabled={!imageUrl || !userData.imageUrl}
              >
                Reject
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
