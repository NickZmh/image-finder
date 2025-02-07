import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import './App.css'
import AppRouter from './Router'
import { AppProvider } from './context'

function App() {
  const theme = createTheme()
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </AppProvider>
  )
}

export default App
