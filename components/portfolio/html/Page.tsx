import { Box, Typography } from '@mui/material'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { usePortfolioStore } from '../../../stores/usePortfolio'
import HeroSection from './HeroSection'
import AboutMe from './AboutMe'
import MyWork from './MyWork'
import CustomizeScene from './CustomizeScene'

export default function Page(): JSX.Element {
  const mode = usePortfolioStore(state => state.mode)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time: any) => {
      lenis.raf(time * 1000)
    })
  }, [])

  return <Box
    component='div'
    sx={{
      zIndex: '0',
      width: '100%',
      overflow: 'hidden',
      color: mode ? 'text.secondary' : 'text.primary'
    }}
  >
    <CustomizeScene />
    <Box component='div' sx={{ position: 'relative' }}>
      <HeroSection />

      <Box
        className='first-move'
        component='div'
        sx={{ height: '3000px', width: '100%', position: 'relative', zIndex: '2' }}
      />

      <AboutMe background={mode ? 'text.primary' : 'text.secondary'} />

      <Box
        className='second-move'
        component='div'
        sx={{ height: '3000px', width: '100%', position: 'relative', zIndex: '2' }}
      />

      <MyWork background={mode ? 'text.primary' : 'text.secondary'} />

      <Box
        className='third-move'
        component='div'
        sx={{ height: '3000px', width: '100%', position: 'relative', zIndex: '2' }}
      />

      <Box component='div' sx={{ height: '100svh', width: '100%' }}>
        <Box
          component='div'
          padding='4em 0em 0em 2em'
          position='relative'
          zIndex='2'
          textTransform='uppercase'
        >
          <Typography
            variant='h6'
            sx={{
              backgroundColor: mode ? 'text.primary' : 'text.secondary',
              borderRadius: '50px',
              width: 'max-content',
              padding: '0px 0.5em'
            }}
          >
            Explore Around
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
}
