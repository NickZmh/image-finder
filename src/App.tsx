import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import './App.css'
import { AppRouter } from './router'
import { AppProvider } from './context'

const App: React.FC = () => {
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
