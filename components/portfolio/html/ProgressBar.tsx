import { Box } from '@mui/material'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function ProgressBar(props: {
  side: 'left' | 'right'
  section: string
}): JSX.Element {
  const progressBar = useRef<HTMLDivElement>()
  const progressBarWrapper = useRef<HTMLDivElement>()

  useEffect(() => {
    let mm = gsap.matchMedia()

    mm.add({
      isDesktop: '(min-width: 600px)',
      isMobile: '(max-width: 599px)'
    }, () => {
      if (props.side === 'right') {
        gsap.to(
          `.${props.section}`,
          {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: `.${props.section}`,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6
            }
          }
        )
        gsap.to(
          `.${props.section}`,
          {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: `.${props.section}`,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          }
        )
      } else {
        gsap.to(
          `.${props.section}`,
          {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: `.${props.section}`,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6
            }
          }
        )
        gsap.to(
          `.${props.section}`,
          {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: `.${props.section}`,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          }
        )
      }

      gsap.from(
        progressBar.current as HTMLDivElement,
        {
          scaleY: 0,
          scrollTrigger: {
            trigger: `.${props.section}`,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            pin: progressBarWrapper.current,
            pinSpacing: false
          }
        }
      )
    })

    return () => {
      mm.revert()
    }
  }, [props.section, props.side])

  return <Box
    ref={progressBarWrapper}
    component='div'
    width='12px'
    zIndex='5'
    position='absolute'
    top='0'
    left={{
      xs: 'auto',
      sm: props.side === 'left' ? '0' : 'auto'
    }}
    right={{
      xs: '0',
      sm: props.side === 'right' ? '0' : 'auto'
    }}
  >
    <Box
      ref={progressBar}
      component='div'
      height='100vh'
      width='100%'
      sx={{
        backgroundColor: 'secondary.main',
        transformOrigin: 'top center',
        transform: 'scaleY(1)'
      }}
    />
  </Box>
}
