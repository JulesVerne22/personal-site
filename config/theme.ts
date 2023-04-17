import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    lightGrey: Palette['primary'];
  }

  interface PaletteOptions {
    lightGrey: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#222831',
      contrastText: '#EEEEEE'
    },
    secondary: {
      main: '#00ADB5',
      contrastText: '#222831'
    },
    lightGrey: {
      main: '#393E46',
      contrastText: '#EEEEEE'
    },
    text: {
      primary: '#EEEEEE',
      secondary: '#222831'
    },
    divider: '#EEEEEE',
    background: {
      paper: '#222831'
    }
  }
})

export default theme