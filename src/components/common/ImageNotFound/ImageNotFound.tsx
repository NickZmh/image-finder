import React from 'react'
import { Button, Box, Typography } from '@mui/material'
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined'
import { useNavigate } from 'react-router-dom'
import { LOCALIZATION } from '../../../constants'

export const ImageNotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      aria-live="assertive"
    >
      <BrokenImageOutlinedIcon sx={{ fontSize: 80, color: 'black' }} />
      <Typography color="error" maxWidth="400px">
        {LOCALIZATION.imageNotFound}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        {LOCALIZATION.goToForm}
      </Button>
    </Box>
  )
}
