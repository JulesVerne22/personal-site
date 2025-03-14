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
  const homePage = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const unsubscribeMode = usePortfolioStore.subscribe(
      state => state.mode,
      (mode) => {
        let ctx = gsap.context(() => {
          if (homePage) {
            if (mode) {
              gsap.to(homePage.current, {
                backgroundColor: backgroundLight,
                duration: 0.5
              })
            } else {
              gsap.to(homePage.current, {
                backgroundColor: backgroundDark,
                duration: 0.5
              })
            }
          }
        })

        return () => {
          ctx.revert()
        }
      }
    )

    return () => {
      unsubscribeMode()
    }
  }, [backgroundLight, backgroundDark, homePage])

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
