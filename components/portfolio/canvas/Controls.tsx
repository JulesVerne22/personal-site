import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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

        // Resets
        const originalOCameraX = oCamera.position.x
        const originalPCameraX = pCamera.position.x
        const originalOCameraZoom = oCamera.zoom = 1
        const originalPCameraZoom = pCamera.zoom = 1

        mm.add({
          isDesktop: '(min-width: 600px)',
          isMobile: '(max-width: 599px)'
        }, (context) => {
          let {isDesktop, isMobile} = context.conditions as any
          oCamera.zoom = originalOCameraZoom
          pCamera.zoom = originalPCameraZoom
          oCamera.position.x = originalOCameraX
          pCamera.position.x = originalPCameraX
          animation.current = isDesktop ? 'desktop' : 'mobile'

          gsap.timeline({
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom bottom',
              invalidateOnRefresh: true
            }
          }).to(
            pCamera.position,
            {
              x: () => originalPCameraX
            }
          ).to(
            oCamera.position,
            {
              x: () => originalOCameraX
            }
          )

          const firstTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: isDesktop
            },
            onReverseComplete: () => {
              if(isDesktop) {
                firstTimeline.invalidate()
              }
            }
          }).to(
            pCamera.position,
            {
              x: () => {
                if(isDesktop) {
                  const currentViewport = getViewport()
                  return originalPCameraX - currentViewport.width * 0.25
                }else {
                  return originalPCameraX
                }
              }
            },
            'same-first'
          ).to(
            oCamera.position,
            {
              x: () => {
                if(isDesktop) {
                  const currentViewport = getViewport()
                  return originalOCameraX - currentViewport.width * 0.002
                }else {
                  return originalOCameraX
                }
              }
            },
            'same-first'
          ).to(
            pCamera,
            {
              zoom: isMobile ? 1.2 : originalPCameraZoom,
              onUpdate: () => {
                if(isMobile) {
                  pCamera.updateProjectionMatrix()
                }
              }
            },
            'same-first'
          ).to(
            oCamera,
            {
              zoom: isMobile ? 1.2 : originalOCameraZoom,
              onUpdate: () => {
                if(isMobile) {
                  oCamera.updateProjectionMatrix()
                }
              }
            },
            'same-first'
          )

          const secondTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: isDesktop
            },
            onReverseComplete: () => {
              if(isDesktop) {
                secondTimeline.invalidate()
              }
            }
          }).fromTo(
            pCamera.position,
            {
              x: () => {
                if(isDesktop) {
                  const currentViewport = getViewport()
                  return originalPCameraX - currentViewport.width * 0.25
                }else {
                  return originalPCameraX
                }
              }
            },
            {
              x: () => {
                if(isDesktop) {
                  const currentViewport = getViewport()
                  return originalPCameraX + currentViewport.width * 0.25
                }else {
                  return originalPCameraX
                }
              }
            },
            'same-second'
          ).fromTo(
            oCamera.position,
            {
              x: () => {
                if(isDesktop) {
                  const currentViewport = getViewport()
                  return originalOCameraX - currentViewport.width * 0.002
                }else {
                  return originalOCameraX
                }
              }
            },
            {
              x: () => {
                if(isDesktop) {
                  const currentViewport = getViewport()
                  return originalOCameraX + currentViewport.width * 0.002
                }else {
                  return originalOCameraX
                }
              }
            },
            'same-second'
          ).to(
            pCamera,
            {
              zoom: isMobile ? 1.0 : originalPCameraZoom,
              onUpdate: () => {
                if(isMobile) {
                  pCamera.updateProjectionMatrix()
                }
              }
            },
            'same-second'
          ).to(
            oCamera,
            {
              zoom: isMobile ? 1.0 : originalOCameraZoom,
              onUpdate: () => {
                if(isMobile) {
                  oCamera.updateProjectionMatrix()
                }
              }
            },
            'same-second'
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