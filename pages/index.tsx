import { Box } from '@mui/material'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useControls } from 'leva'
import { usePortfolioStore } from '../stores/usePortfolio'
import Portfolio from '../components/portfolio/Portfolio'

export default function Home(): JSX.Element {
  const { backgroundDark, backgroundLight } = useControls('Environment', {
    backgroundDark: '#2c3269',
    backgroundLight: '#599da0'
  }, { collapsed: true })
  const mode = usePortfolioStore(state => state.mode)
  const homePage = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (homePage) {
        if (mode) {
          gsap.to(homePage.current, {
            backgroundColor: backgroundLight
          })
        } else {
          gsap.to(homePage.current, {
            backgroundColor: backgroundDark
          })
        }
      }
    })

    return () => {
      ctx.revert()
    }
  }, [mode, backgroundLight, backgroundDark, homePage])

  return <Box
    ref={homePage}
    component='div'
    sx={{
      width: '100%',
      height: '100%',
      backgroundColor: backgroundLight
    }}
  >
    <Portfolio />
  </Box>
}
