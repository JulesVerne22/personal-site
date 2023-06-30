import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { gsap } from 'gsap'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import { usePortfolioStore } from "../../../stores/usePortfolio"

export default function Preloader(): JSX.Element {
  const { loaded, modelChildren, lenis } = usePortfolioStore(state => ({
    loaded: state.loaded,
    modelChildren: state.modelChildren,
    lenis: state.lenis
  }), shallow)

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    function introOne() {
      return new Promise(resolve => {
        const timelineOne = gsap.timeline()
          .to(modelChildren['Shadow'].scale, {
            x: 0.25 * 1.0075,
            y: 0.25 * 1.0225,
            z: 0.25,
            ease: 'back.out(2.5)',
            duration: 0.7
          }, 'intro1').to(modelChildren['Cube'].scale, {
            x: 0.25,
            y: 0.25,
            z: 0.25,
            ease: 'back.out(2.5)',
            duration: 0.7
          }, 'intro1').to(modelChildren['Scene'].position, {
            x: isDesktop ? -1 : 0,
            y: isDesktop ? 0.25 : 0.5,
            ease: 'power1.out',
            duration: 0.7,
            onComplete: () => {
              resolve('resolved')
            }
          })
      })
    }

    function introTwo() {
      return new Promise(resolve => {
        const timelineTwo = gsap.timeline()
          .to(modelChildren['Scene'].position, {
            x: 0,
            y: -0.5,
            z: 0,
            ease: 'power1.out',
            duration: 0.7
          }, 'intro2').to(modelChildren['Cube'].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power1.out',
            duration: 0.7
          }, 'intro2').to(modelChildren['Shadow'].scale, {
            x: 1.0075,
            y: 1.0225,
            z: 1,
            ease: 'power1.out',
            duration: 0.7
          }, 'intro2').to(modelChildren['Shadow'].rotation, {
            z: -Math.PI * 2 + Math.PI / 4,
            ease: 'power1.out',
            duration: 0.7
          }, 'intro2').to(modelChildren['Cube'].rotation, {
            y: -Math.PI * 2,
            ease: 'power1.out',
            duration: 0.7
          }, 'intro2').to(modelChildren['Structure'].rotation, {
            y: -Math.PI * 2,
            ease: 'power1.out',
            duration: 0.7
          }, 'intro2').to(modelChildren['Structure'].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power1.out',
            duration: 0.7
          }, 'intro2').to(modelChildren['Structure2'].scale, {
            y: 1,
            z: 1,
            ease: 'power1.out',
            duration: 0.7
          }, 'structure').to(modelChildren['Cube'].scale, {
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.out'
          }, 'structure').to([
            modelChildren['Bookshelf'].scale,
            modelChildren['Carpet'].scale,
            modelChildren['FloorItems'].scale,
            modelChildren['Desk'].scale
          ], {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1)'
          }, 'structure').to(modelChildren['DeskItems'].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1)'
          }).to(modelChildren['ChairLegs'].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1)'
          }, 'chair').to(modelChildren['Chair'].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1)'
          }, 'chair').to(modelChildren['Chair'].rotation, {
            y: Math.PI * 2 * 3,
            ease: 'power1.out(1)',
            duration: 1.5,
            onComplete: () => {
              resolve('resolved')
              lenis?.start()
            }
          }, 'chair')
      })
    }

    async function triggerIntroTwo(e: Event) {
      if ((e as WheelEvent).deltaY > 0) {
        window.removeEventListener('wheel', triggerIntroTwo)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        await introTwo()
      }
    }

    let initialY: number | null = null
    async function onTouchStart(e: Event) {
      window.removeEventListener('touchstart', onTouchStart)
      const firstTouch = (e as TouchEvent).touches[0]
      initialY = firstTouch.clientY
    }

    async function onTouchMove(e: Event) {
      if (!initialY) {
        return
      }

      const currentY = (e as TouchEvent).touches[0].clientY
      const difference = initialY - currentY

      if (difference > 0) {
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('wheel', triggerIntroTwo)
        await introTwo()
      }
      initialY = null
    }

    async function playIntro() {
      await introOne()
      window.addEventListener('wheel', triggerIntroTwo)
      window.addEventListener('touchstart', onTouchStart)
      window.addEventListener('touchmove', onTouchMove)
    }

    if (loaded) {
      playIntro()
    }
  }, [loaded])

  return <></>
}
