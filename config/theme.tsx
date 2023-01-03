import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#41505a',
      main: '#222831',
      dark: '#000009',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#5cdfe7',
      main: '#00adb5',
      dark: '#007d85',
      contrastText: '#000000',
    }
  }
})

export default theme