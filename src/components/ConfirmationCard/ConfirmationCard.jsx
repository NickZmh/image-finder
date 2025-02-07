import { useAppContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRedirectOnInvalidUserData } from '../../hooks'

export const ConfirmationCard = () => {
  const { userData } = useAppContext()
  const navigate = useNavigate()

  useRedirectOnInvalidUserData(userData, () => navigate('/'))

  return (
    <>
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

          {userData.imageUrl && (
            <Card sx={{ width: '100%' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="500"
                  image={userData.imageUrl}
                  alt="Unsplash Image"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    textAlign="left"
                    fontWeight="700"
                  >
                    {userData.name} {userData.surname}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Box>
      </Box>
    </>
  )
}
