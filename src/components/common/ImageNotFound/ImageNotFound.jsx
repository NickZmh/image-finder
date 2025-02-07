import { Button, Box, Typography } from '@mui/material'
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined'
import { useNavigate } from 'react-router-dom'

export const ImageNotFound = () => {
  const navigate = useNavigate()

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <BrokenImageOutlinedIcon sx={{ fontSize: 90, color: 'black' }} />
      <Typography color="error">
        Ooops, Seems image no found.
        <br /> Please go back to home page and fill out the form again.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Form
      </Button>
    </Box>
  )
}
