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

  const {viewport, getViewport} = useThree(state => ({
    viewport: state.viewport,
    getViewport: state.viewport.getCurrentViewport
  }))
  const animation = useRef<any>(null)
  
  useLayoutEffect(() => {
    if(typeof oCamera !== 'undefined' && typeof pCamera !== 'undefined') {
      if(animation.current === null) {
        let mm = gsap.matchMedia()
        console.log('test')
        // Resets
        const originalOCameraX = oCamera.position.x
        const originalPCameraX = pCamera.position.x
        const originalOCameraZoom = oCamera.zoom = 1
        const originalPCameraZoom = pCamera.zoom = 1

        // Desktop
        mm.add("(min-width: 600px)", () => {
          oCamera.zoom = originalOCameraZoom
          pCamera.zoom = originalPCameraZoom
          animation.current = 'desktop'

          gsap.to(
            [oCamera.position],
            {
              x: () => {
                const currentViewport = getViewport()
                return originalOCameraX - currentViewport.width * 0.002
              },
              scrollTrigger: {
                trigger: '.first-move',
                scrub: 0.6,
                markers: false,
                start: 'top top',
                end: 'bottom bottom',
                invalidateOnRefresh: true
              },
              onComplete: () => {
                gsap.to(
                  [oCamera.position],
                  {
                    x: () => {
                      const currentViewport = getViewport()
                      return originalOCameraX + currentViewport.width * 0.002
                    },
                    scrollTrigger: {
                      trigger: '.second-move',
                      scrub: 0.6,
                      markers: false,
                      start: 'top top',
                      end: 'bottom bottom',
                      invalidateOnRefresh: true
                    }
                  }
                )
              }
            }
          )

          gsap.to(
            [pCamera.position],
            {
              x: () => {
                const currentViewport = getViewport()
                return originalPCameraX - currentViewport.width * 0.25
              },
              scrollTrigger: {
                trigger: '.first-move',
                scrub: 0.6,
                markers: false,
                start: 'top top',
                end: 'bottom bottom',
                invalidateOnRefresh: true
              },
              onComplete: () => {
                gsap.to(
                  [pCamera.position],
                  {
                    x: () => {
                      const currentViewport = getViewport()
                      return originalPCameraX + currentViewport.width * 0.25
                    },
                    scrollTrigger: {
                      trigger: '.second-move',
                      scrub: 0.6,
                      markers: false,
                      start: 'top top',
                      end: 'bottom bottom',
                      invalidateOnRefresh: true
                    }
                  }
                )
              }
            }
          )
        })

        // Mobile
        mm.add("(max-width: 599px)", () => {
          oCamera.position.x = originalOCameraX
          pCamera.position.x = originalPCameraX
          animation.current = 'mobile'

          gsap.to(
            [oCamera],
            {
              zoom: 1.2,
              scrollTrigger: {
                trigger: '.first-move',
                scrub: 0.6,
                markers: false,
                start: 'top top',
                end: 'bottom bottom'
              },
              onUpdate: () => {
                oCamera.updateProjectionMatrix()
              },
              onComplete: () => {
                gsap.to(
                  [oCamera],
                  {
                    zoom: 1,
                    scrollTrigger: {
                      trigger: '.second-move',
                      scrub: 0.6,
                      markers: false,
                      start: 'top top',
                      end: 'bottom bottom'
                    },
                    onUpdate: () => {
                      oCamera.updateProjectionMatrix()
                    }
                  }
                )
              }
            }
          )

          gsap.to(
            [pCamera],
            {
              zoom: 1.2,
              scrollTrigger: {
                trigger: '.first-move',
                scrub: 0.6,
                markers: false,
                start: 'top top',
                end: 'bottom bottom'
              },
              onUpdate: () => {
                pCamera.updateProjectionMatrix()
              },
              onComplete: () => {
                gsap.to(
                  [pCamera],
                  {
                    zoom: 1,
                    scrollTrigger: {
                      trigger: '.second-move',
                      scrub: 0.6,
                      markers: false,
                      start: 'top top',
                      end: 'bottom bottom'
                    },
                    onUpdate: () => {
                      pCamera.updateProjectionMatrix()
                    }
                  }
                )
              }
            }
          )
        })
      }else {
        if(animation.current !== 'mobile') {
          ScrollTrigger.refresh()
        }
      }
    }
  }, [oCamera, pCamera, viewport])

  return <></>
}