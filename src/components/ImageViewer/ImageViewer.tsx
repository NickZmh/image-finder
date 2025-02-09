import React from 'react'
import { useEffect, useMemo } from 'react'
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
import { ImageNotFound, FetchError } from '../common'
import { LOCALIZATION } from '../../constants'

export const ImageViewer: React.FC = () => {
  const { userData, setUserData } = useAppContext()
  const navigate = useNavigate()

  const { imageUrl, isLoading, error, fetchImage } = useFetchImage()

  const category = useMemo(
    () => userData.category || userData.customCategory,
    [userData.category, userData.customCategory],
  )

  useEffect(() => {
    if (imageUrl && imageUrl !== userData.imageUrl) {
      setUserData((prev) => ({ ...prev, imageUrl }))
    }
  }, [imageUrl, userData.imageUrl, setUserData])

  useEffect(() => {
    if (!userData.imageUrl && category) {
      fetchImage(category)
    }
  }, [userData.imageUrl, category])

  const shouldDisplayImageNotFound =
    !userData.imageUrl && !imageUrl && !category && !isLoading && !error

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
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            {LOCALIZATION.goBack}
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
              {LOCALIZATION.chooseImage}
            </Typography>
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              justifyContent="center"
              sx={{ width: '100%', height: '490px' }}
            >
              {isLoading && <CircularProgress />}

              {userData.imageUrl && !isLoading && !error && (
                <CardMedia
                  component="img"
                  height="100%"
                  image={imageUrl || userData.imageUrl}
                  alt="Unsplash Image"
                />
              )}

              {!isLoading && error && (
                <FetchError
                  error={error}
                  onRetry={() => fetchImage(userData.category)}
                />
              )}

              {shouldDisplayImageNotFound && <ImageNotFound />}
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
                disabled={!userData.imageUrl}
              >
                {LOCALIZATION.accept}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: '16px', pt: '16px', pb: '16px' }}
                onClick={() => fetchImage(category)}
                disabled={!userData.imageUrl}
              >
                {LOCALIZATION.reject}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
