import React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { LOCALIZATION } from '../../../constants'
import { useNavigate } from 'react-router-dom'

interface FetchErrorProps {
  error: string
  onRetry: () => void
}

export const FetchError: React.FC<FetchErrorProps> = ({ error, onRetry }) => {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      aria-live="assertive"
    >
      <Typography color="error" mb={2}>
        {error}
      </Typography>
      <Button variant="contained" color="secondary" onClick={onRetry}>
        {LOCALIZATION.tryAgain}
      </Button>
      <Button
        variant="contained"
        sx={{ mt: '16px' }}
        color="primary"
        onClick={() => navigate('/')}
      >
        {LOCALIZATION.goToForm}
      </Button>
    </Box>
  )
}
