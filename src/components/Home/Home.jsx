import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context'
import { Container, InputLabel, FormControl } from '@mui/material'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'

const CATEGORY_OPTIONS = ['Travel', 'Cars', 'Wildlife', 'Technology', 'Other']

export const Home = () => {
  const navigate = useNavigate()
  const { setUserData } = useAppContext()
  const [form, setForm] = useState({
    name: '',
    surname: '',
    category: '',
    customCategory: '',
  })

  const isOtherCategory = form.category === 'Other'

  const isFormValid =
    form.name.trim() &&
    form.surname.trim() &&
    form.category &&
    (form.category !== 'Other' || form.customCategory.trim())

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedCategory = isOtherCategory
      ? form.customCategory
      : form.category

    setUserData((prev) => ({ ...prev, ...form, category: selectedCategory }))
    navigate('/image')
  }

  useEffect(() => {
    setUserData((prevState) => ({
      ...prevState,
      imageUrl: '',
    }))
  }, [])

  return (
    <>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={4}
          sx={{ maxWidth: 480, margin: 'auto' }}
        >
          <Typography variant="h4" mb={2}>
            Enter Your Details
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Surname"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setForm({ ...form, surname: e.target.value })}
          />
          <FormControl fullWidth sx={{ mt: '16px', mb: '8px' }}>
            <InputLabel id="category-label">Select Option *</InputLabel>
            <Select
              fullWidth
              value={form.category}
              labelId="category-label"
              id="category-label"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              margin="normal"
              label="Select Option"
            >
              {CATEGORY_OPTIONS.map((category) => (
                <MenuItem value={category} key={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isOtherCategory && (
            <TextField
              label="Custom Category *"
              fullWidth
              margin="normal"
              onChange={(e) =>
                setForm({ ...form, customCategory: e.target.value })
              }
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: '16px', pt: '16px', pb: '16px' }}
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Find Image
          </Button>
        </Box>
      </Container>
    </>
  )
}
