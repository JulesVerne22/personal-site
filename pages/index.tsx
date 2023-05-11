import { Box } from '@mui/material'
import Portfolio from '../components/portfolio/Portfolio'

export default function Home(): JSX.Element {
  return <Box
    component='div'
    sx={{
      position: 'fixed',
      width: '100svw',
      height: '100svh',
      top: 0,
      background: '#599da0'
    }}
  >
    <Portfolio />
  </Box>
}
