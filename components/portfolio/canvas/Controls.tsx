import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { usePortfolioStore } from '../../../stores/usePortfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Controls(): JSX.Element {
  const {
    oCamera,
    pCamera
  } = usePortfolioStore(state => ({
    oCamera: state.oCamera,
    pCamera: state.pCamera
  }))

  const {viewport, getViewport} = useThree(state => ({viewport: state.viewport, getViewport: state.viewport.getCurrentViewport}))
  const animation = useRef<any>(null)

  useLayoutEffect(() => {
    if(typeof oCamera !== 'undefined' && typeof pCamera !== 'undefined') {
      if(animation.current === null) {
        animation.current = gsap.fromTo(
          [oCamera.position],
          {
            x: 0
          },
          {
            x: () => {
              const currentViewport = getViewport()
              return currentViewport.width * -0.0013
            },
            scrollTrigger: {
              trigger: '.first-move',
              scrub: 0.6,
              markers: true,
              start: 'top top',
              end: 'bottom bottom',
              invalidateOnRefresh: true
            }
          }
        )
        gsap.fromTo(
          [pCamera.position],
          {
            x: 0
          },
          {
            x: () => {
              const currentViewport = getViewport()
              return currentViewport.width * -0.25
            },
            scrollTrigger: {
              trigger: '.first-move',
              scrub: 0.6,
              markers: true,
              start: 'top top',
              end: 'bottom bottom',
              invalidateOnRefresh: true
            }
          }
        )
      }else {
        ScrollTrigger.refresh()
      }
    }
  }, [oCamera, pCamera, viewport])

  return <></>
}