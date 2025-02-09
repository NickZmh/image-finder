import { useEffect, useState, FormEvent } from 'react'
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
import { LOCALIZATION } from '../../constants'

interface FormInterface {
  name: string
  surname: string
  category: string
  customCategory: string
}

const CATEGORY_OPTIONS: string[] = [
  'Travel',
  'Cars',
  'Wildlife',
  'Technology',
  'Other',
]

const initialFormState = {
  name: '',
  surname: '',
  category: '',
  customCategory: '',
}

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { setUserData } = useAppContext()
  const [form, setForm] = useState<FormInterface>(initialFormState)

  const isOtherCategory: boolean = form.category === 'Other'

  const isFormValid: boolean =
    !!form.name.trim() &&
    !!form.surname.trim() &&
    !!form.category &&
    (!isOtherCategory || !!form.customCategory.trim())

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const selectedCategory = isOtherCategory
      ? form.customCategory
      : form.category

    setUserData((prev) => ({ ...prev, ...form, category: selectedCategory }))
    navigate('/image')
  }

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
            {LOCALIZATION.enterYourDetails}
          </Typography>
          <TextField
            autoFocus
            label="Name"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Surname"
            fullWidth
            margin="normal"
            required
            value={form.surname}
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
              value={form.customCategory}
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
            {LOCALIZATION.findImageButton}
          </Button>
        </Box>
      </Container>
    </>
  )
}
