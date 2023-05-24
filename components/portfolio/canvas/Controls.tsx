import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { OrbitControls as OC } from 'three-stdlib'
import { usePortfolioStore } from '../../../stores/usePortfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Controls(): JSX.Element {
  const orbitControls = useRef<OC>(null!)
  const {
    oCamera,
    pCamera,
    room
  } = usePortfolioStore(state => ({
    oCamera: state.oCamera,
    pCamera: state.pCamera,
    room: state.room
  }))

  const {viewport, getViewport} = useThree(state => ({
    viewport: state.viewport,
    getViewport: state.viewport.getCurrentViewport
  }))
  const animation = useRef<any>(null)
  
  useLayoutEffect(() => {
    if(typeof oCamera !== 'undefined' && typeof pCamera !== 'undefined' && orbitControls.current) {
      if(animation.current === null) {
        let mm = gsap.matchMedia()

        // Resets
        const originalOCameraX = oCamera.position.x
        const originalPCameraX = pCamera.position.x
        const originalOCameraY = oCamera.position.y
        const originalPCameraY = pCamera.position.y
        const originalOCameraZ = oCamera.position.z
        const originalPCameraZ = pCamera.position.z
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
              start: 'top center',
              end: 'bottom bottom',
              invalidateOnRefresh: true
            }
          }).to(
            pCamera.position,
            {
              x: () => originalPCameraX
            },
            'same-hero'
          ).to(
            oCamera.position,
            {
              x: () => originalOCameraX
            },
            'same-hero'
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
            },
          }).to(
            pCamera.position,
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
          ).to(
            oCamera.position,
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
              zoom: isMobile ? 0.8 : originalPCameraZoom,
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
              zoom: isMobile ? 0.8 : originalOCameraZoom,
              onUpdate: () => {
                if(isMobile) {
                  oCamera.updateProjectionMatrix()
                }
              }
            },
            'same-second'
          )
          
          const thirdTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: isDesktop,
              onLeave: () => {
                orbitControls.current.enabled = true
                orbitControls.current.saveState()
              },
              onEnterBack: () => {
                orbitControls.current.reset()
                orbitControls.current.enabled = false
                oCamera.position.x = originalOCameraX
                pCamera.position.x = originalPCameraX
                oCamera.position.y = originalOCameraY
                pCamera.position.y = originalPCameraY
                oCamera.position.z = originalOCameraZ
                pCamera.position.z = originalPCameraZ
                oCamera.zoom = originalOCameraZoom
                pCamera.zoom = originalPCameraZoom
              }
            },
            onReverseComplete: () => {
              if(isDesktop) {
                thirdTimeline.invalidate()
              }
            }
          }).to(
            pCamera.position,
            {
              x: () => {
                return originalPCameraX
              }
            },
            'same-third'
          ).to(
            oCamera.position,
            {
              x: () => {
                return originalOCameraX
              }
            },
            'same-third'
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
            'same-third'
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
            'same-third'
          )
        })
      }else {
        if(animation.current !== 'mobile') {
          ScrollTrigger.refresh()
        }
      }
    }
  }, [oCamera, pCamera, viewport])

  // Rock wall camera -8, 3, -1.5

  return <>
    <OrbitControls
      ref={orbitControls}
      enableZoom={true}
      enablePan={true}
      enabled={false}
      maxAzimuthAngle={Math.PI / 4}
      minAzimuthAngle={-Math.PI * 0.75}
      maxPolarAngle={Math.PI / 2}
    />
  </>
}