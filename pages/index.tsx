import { Box } from '@mui/material'
import Portfolio from '../components/portfolio/Portfolio'

export default function Home(): JSX.Element {
  return <Box
    component='div'
    sx={{
      width: '100%',
      height: '100%'
    }}
  >
    <Portfolio />
  </Box>
}
