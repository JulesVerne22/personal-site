import { Box } from '@mui/material'
import HeroSection from './HeroSection'
import AboutMe from './AboutMe'
import MyWork from './MyWork'
import CustomizeScene from './CustomizeScene'

export default function Page(): JSX.Element {
  return <Box
      component='div'
      sx={{
        zIndex: '99999',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
    <CustomizeScene />
    <Box component='div' sx={{ position: 'relative' }}>
      <HeroSection />

      <Box className='first-move' component='div' sx={{ height: '3000px', width: '100%' }} />

      <AboutMe />

      <Box component='div' sx={{ height: '3000px', width: '100%' }} />

      <MyWork />
    </Box>
  </Box>
}