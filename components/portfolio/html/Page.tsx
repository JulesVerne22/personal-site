import { Box, Switch, Typography } from '@mui/material'
import DownArrow from '@mui/icons-material/KeyboardArrowDown'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { shallow } from 'zustand/shallow'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, ChangeEvent } from 'react'
import { usePortfolioStore } from '../../../stores/usePortfolio'
import HeroSection from './HeroSection'
import AboutMe from './AboutMe'
import MyWork from './MyWork'
import CustomizeScene from './CustomizeScene'

export default function Page(): JSX.Element {
  const { mode, setLenis, setEnableOrbitControls } = usePortfolioStore(state => ({
    mode: state.mode,
    setLenis: state.setLenis,
    setEnableOrbitControls: state.setEnableOrbitControls
  }), shallow)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time: any) => {
      lenis.raf(time * 1000)
    })

    lenis.scrollTo('top', { immediate: true })
    lenis.stop()

    setLenis(lenis)

    return () => {
      lenis.destroy()
    }
  }, [])

  function toggleOrbitControls(e: ChangeEvent<HTMLInputElement>) {
    setEnableOrbitControls(e.target.checked)
  }

  return <Box
    component='div'
    sx={{
      zIndex: '0',
      width: '100%',
      overflow: 'hidden',
      color: mode ? 'text.secondary' : 'text.primary'
    }}
  >
    <Box
      component='div'
      className='starting-arrow'
      sx={{
        opacity: 0,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        transition: 'color 2.5s'
      }}
    >
      <Box
        component='div'
        className='scrollArrow'
        position='absolute'
        bottom='10%'
      >
        <DownArrow fontSize='large' />
      </Box>
    </Box>

    <Box
      component='div'
      className='intro-text'
      sx={{
        opacity: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '75%',
        transition: 'color 2.5s'
      }}
    >
      <Typography
        variant='h5'
        sx={{
          marginLeft: {
            xs: '0px',
            md: '125px'
          },
          marginTop: {
            xs: '100px',
            md: '0px'
          }
        }}
      >
        WELCOME TO MY PORTFOLIO!
      </Typography>
    </Box>

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
          <Switch onChange={toggleOrbitControls} color='default' />
        </Box>
      </Box>
    </Box>
  </Box>
}
