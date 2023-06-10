import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'
import { OrbitControls as OC } from 'three-stdlib'
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { OrthographicCamera as oCamera, PerspectiveCamera as pCamera } from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function Camera(): JSX.Element {
  const { orthographic, frustrum } = useControls('Camera', {
    orthographic: false,
    frustrum: {
      value: 5,
      min: 0,
      max: 10
    }
  }, { collapsed: true })

  const oCamera = useRef<oCamera>(null!)
  const pCamera = useRef<pCamera>(null!)
  const orbitControls = useRef<OC>(null!)
  const { size, getViewport } = useThree(state => ({
    size: state.size,
    getViewport: state.viewport.getCurrentViewport
  }))

  useLayoutEffect(() => {
    let mm = gsap.matchMedia()

    // Resets
    const originalOCameraX = oCamera.current.position.x
    const originalPCameraX = pCamera.current.position.x
    const originalOCameraY = oCamera.current.position.y
    const originalPCameraY = pCamera.current.position.y
    const originalOCameraZ = oCamera.current.position.z
    const originalPCameraZ = pCamera.current.position.z
    const originalOCameraZoom = oCamera.current.zoom = 1
    const originalPCameraZoom = pCamera.current.zoom = 1

    mm.add({
      isDesktop: '(min-width: 600px)',
      isMobile: '(max-width: 599px)'
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions as any
      oCamera.current.zoom = originalOCameraZoom
      pCamera.current.zoom = originalPCameraZoom
      oCamera.current.position.x = originalOCameraX
      pCamera.current.position.x = originalPCameraX

      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top center',
          end: 'bottom bottom',
          invalidateOnRefresh: true
        }
      }).to(
        pCamera.current.position,
        {
          x: () => originalPCameraX
        },
        'same-hero'
      ).to(
        oCamera.current.position,
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
          if (isDesktop) {
            firstTimeline.invalidate()
          }
        }
      }).to(
        pCamera.current.position,
        {
          x: () => {
            if (isDesktop) {
              const currentViewport = getViewport()
              return originalPCameraX - currentViewport.width * 0.25
            } else {
              return originalPCameraX
            }
          }
        },
        'same-first'
      ).to(
        oCamera.current.position,
        {
          x: () => {
            if (isDesktop) {
              const currentViewport = getViewport()
              return originalOCameraX - currentViewport.width * 0.002
            } else {
              return originalOCameraX
            }
          }
        },
        'same-first'
      ).to(
        pCamera.current,
        {
          zoom: isMobile ? 1.2 : originalPCameraZoom,
          onUpdate: () => {
            if (isMobile) {
              pCamera.current.updateProjectionMatrix()
            }
          }
        },
        'same-first'
      ).to(
        oCamera.current,
        {
          zoom: isMobile ? 1.2 : originalOCameraZoom,
          onUpdate: () => {
            if (isMobile) {
              oCamera.current.updateProjectionMatrix()
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
          if (isDesktop) {
            secondTimeline.invalidate()
          }
        }
      }).to(
        pCamera.current.position,
        {
          x: () => {
            if (isDesktop) {
              const currentViewport = getViewport()
              return originalPCameraX + currentViewport.width * 0.25
            } else {
              return originalPCameraX
            }
          }
        },
        'same-second'
      ).to(
        oCamera.current.position,
        {
          x: () => {
            if (isDesktop) {
              const currentViewport = getViewport()
              return originalOCameraX + currentViewport.width * 0.002
            } else {
              return originalOCameraX
            }
          }
        },
        'same-second'
      ).to(
        pCamera.current,
        {
          zoom: isMobile ? 0.8 : originalPCameraZoom,
          onUpdate: () => {
            if (isMobile) {
              pCamera.current.updateProjectionMatrix()
            }
          }
        },
        'same-second'
      ).to(
        oCamera.current,
        {
          zoom: isMobile ? 0.8 : originalOCameraZoom,
          onUpdate: () => {
            if (isMobile) {
              oCamera.current.updateProjectionMatrix()
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
            oCamera.current.position.x = originalOCameraX
            pCamera.current.position.x = originalPCameraX
            oCamera.current.position.y = originalOCameraY
            pCamera.current.position.y = originalPCameraY
            oCamera.current.position.z = originalOCameraZ
            pCamera.current.position.z = originalPCameraZ
            oCamera.current.zoom = originalOCameraZoom
            pCamera.current.zoom = originalPCameraZoom
          }
        },
        onReverseComplete: () => {
          if (isDesktop) {
            thirdTimeline.invalidate()
          }
        }
      }).to(
        pCamera.current.position,
        {
          x: () => {
            return originalPCameraX
          }
        },
        'same-third'
      ).to(
        oCamera.current.position,
        {
          x: () => {
            return originalOCameraX
          }
        },
        'same-third'
      ).to(
        pCamera.current,
        {
          zoom: isMobile ? 1.0 : originalPCameraZoom,
          onUpdate: () => {
            if (isMobile) {
              pCamera.current.updateProjectionMatrix()
            }
          }
        },
        'same-third'
      ).to(
        oCamera.current,
        {
          zoom: isMobile ? 1.0 : originalOCameraZoom,
          onUpdate: () => {
            if (isMobile) {
              oCamera.current.updateProjectionMatrix()
            }
          }
        },
        'same-third'
      )
    })
  }, [getViewport])

  // Rock wall camera -8, 3, -1.5

  return <>
    <OrthographicCamera
      ref={oCamera}
      manual
      makeDefault={orthographic}
      top={frustrum / 2}
      right={size.width / size.height * frustrum / 2}
      bottom={-frustrum / 2}
      left={-size.width / size.height * frustrum / 2}
      near={0}
      far={20}
      position={[0, 2, 3]}
      onUpdate={c => c.updateProjectionMatrix()}
    />
    <PerspectiveCamera
      ref={pCamera}
      manual
      makeDefault={!orthographic}
      fov={35}
      aspect={size.width / size.height}
      near={0.1}
      far={100}
      position={[0, 4, 6]}
      onUpdate={c => c.updateProjectionMatrix()}
    />
    <OrbitControls
      ref={orbitControls}
      enableZoom={true}
      enablePan={true}
      enabled={false}
      maxAzimuthAngle={Math.PI / 4}
      minAzimuthAngle={-Math.PI * 0.75}
      maxPolarAngle={Math.PI / 2}
      minZoom={0.5}
      maxZoom={2}
      minDistance={1.5}
      maxDistance={16}
    />
  </>
}
