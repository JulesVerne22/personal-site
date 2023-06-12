import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial, Group } from 'three'
import { GLTF } from 'three-stdlib'
import { useControls } from 'leva'
import { useRef, useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lights from './Lights'
import { usePortfolioStore } from '../../../stores/usePortfolio'


interface LoadedGLTF extends GLTF {
  nodes: any,
  materials: any
}

gsap.registerPlugin(ScrollTrigger)

export default function Room(): JSX.Element {
  const { ledColor, setLEDColor } = usePortfolioStore(state => ({
    ledColor: state.ledColor,
    setLEDColor: state.setLEDColor
  }))

  const { Screen } = useControls('Office', {
    LEDs: {
      value: ledColor,
      onChange: (v) => {
        setLEDColor(v)
      }
    },
    Screen: {
      value: '#000000'
    }
  }, { collapsed: true })

  const model = useGLTF('/models/portfolioRoomRegrouped.glb', true) as LoadedGLTF
  model.scene.rotation.y = -Math.PI / 4
  model.scene.traverse((child) => {
    child.castShadow = true
    child.receiveShadow = true

    if (child.name === 'DeskItems') {
      const sidePanelMaterial = (child.children[8] as Mesh).material = new MeshPhysicalMaterial()
      sidePanelMaterial.roughness = 1
      sidePanelMaterial.color.set(0x666666)
      sidePanelMaterial.ior = 1.1
      sidePanelMaterial.transmission = 1
      sidePanelMaterial.opacity = 1
      sidePanelMaterial.toneMapped = false

      const computerLightsMaterial = (child.children[6] as Mesh).material = new MeshStandardMaterial()
      computerLightsMaterial.roughness = 1
      computerLightsMaterial.color.set(0x000000)
      computerLightsMaterial.emissiveIntensity = 3
      computerLightsMaterial.emissive.set(ledColor)
      computerLightsMaterial.toneMapped = false

      const childMaterial = (child.children[9] as Mesh).material = new MeshBasicMaterial()
      childMaterial.color.set(Screen)
      childMaterial.toneMapped = false

      //child.scale.set(0, 0, 0)
    } else if (child.name === 'Carpet') {
      const carpetMaterial = (child.children[0] as Mesh).material as MeshStandardMaterial
      carpetMaterial.color.set(ledColor)
      carpetMaterial.color.multiplyScalar(0.25)

      //child.scale.set(0, 0, 0)
    } else if (
      //child.name === 'Desk' ||
      //child.name === 'Bookshelf' ||
      child.name === 'Bench' ||
      //child.name === 'FloorItems' ||
      //child.name === 'Chair' ||
      child.name === 'ClimbingWall' ||
      child.name === 'RedHolds' ||
      child.name === 'OrangeHolds' ||
      child.name === 'PurpleHolds' ||
      child.name === 'BlueHolds' ||
      child.name === 'GreenHolds'
    ) {
      child.scale.set(0, 0, 0)
    } else if (child.name === 'Structure2') {
      child.scale.x = 0.0001
    }
  })

  const lerpCurrent = useRef<number>(0)
  const lerpTarget = useRef<number>(0)
  const lerpEase = useRef<number>(0.1)
  const scene = useRef<Group>(null!)
  const room = useRef<Group>(null!)
  const modelRef = useRef<LoadedGLTF>(null!)
  modelRef.current = model

  useFrame(() => {
    lerpCurrent.current = gsap.utils.interpolate(
      lerpCurrent.current,
      lerpTarget.current,
      lerpEase.current
    )

    scene.current.rotation.y = lerpCurrent.current
  })

  useEffect(() => {
    const trackMouse = (e: MouseEvent) => {
      lerpTarget.current = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth * 0.1
    }

    window.addEventListener('mousemove', trackMouse)

    return () => {
      window.removeEventListener('mousemove', trackMouse)
    }
  }, [])

  useLayoutEffect(() => {
    let mm = gsap.matchMedia()

    mm.add({
      isDesktop: '(min-width: 600px)',
      isMobile: '(max-width: 599px)'
    }, (context) => {
      let { isDesktop } = context.conditions as any
      const secondTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true
        },
        onReverseComplete: () => {
          secondTimeline.invalidate()
        }
      }).to(
        room.current.rotation,
        {
          y: Math.PI / 2
        },
        'same-second'
      ).to(
        room.current.position,
        {
          x: () => {
            return isDesktop ? -0.5 : 1.5
          },
          z: () => {
            return -1.5
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
          invalidateOnRefresh: true,
          onEnterBack: () => {
            scene.current.rotation.y = 0
          }
        },
        onReverseComplete: () => {
          thirdTimeline.invalidate()
        }
      }).to(
        room.current.rotation,
        {
          y: 0
        },
        'same-third'
      ).to(
        room.current.position,
        {
          x: 0,
          z: 0
        },
        'same-third'
      )
    })

    const secondRoomTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.second-move',
        start: 'center center'
      }
    })

    let enterStructure2: any
    let enterClimbingWall: any
    let enterBench: any
    let enterRedHolds: any
    let enterBlueHolds: any
    let enterOrangeHolds: any
    let enterPurpleHolds: any
    let enterGreenHolds: any
    modelRef.current.scene.traverse((child) => {
      if (child.name === 'Structure2') {
        enterStructure2 = gsap.to(
          child.scale,
          {
            x: 1,
            duration: 0.3
          }
        )
      } else if (child.name === 'ClimbingWall') {
        enterClimbingWall = gsap.to(
          child.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }
        )
      } else if (child.name === 'Bench') {
        enterBench = gsap.to(
          child.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }
        )
      } else if (child.name === 'OrangeHolds') {
        enterOrangeHolds = gsap.to(
          child.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }
        )
      } else if (child.name === 'RedHolds') {
        enterRedHolds = gsap.to(
          child.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }
        )
      } else if (child.name === 'PurpleHolds') {
        enterPurpleHolds = gsap.to(
          child.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }
        )
      } else if (child.name === 'BlueHolds') {
        enterBlueHolds = gsap.to(
          child.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }
        )
      } else if (child.name === 'GreenHolds') {
        enterGreenHolds = gsap.to(
          child.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }
        )
      }
    })

    secondRoomTimeline.add(enterStructure2)
    secondRoomTimeline.add(enterClimbingWall, 'bench-and-wall')
    secondRoomTimeline.add(enterBench, 'bench-and-wall')
    secondRoomTimeline.add(enterOrangeHolds)
    secondRoomTimeline.add(enterRedHolds)
    secondRoomTimeline.add(enterPurpleHolds)
    secondRoomTimeline.add(enterBlueHolds)
    secondRoomTimeline.add(enterGreenHolds)
  }, [])

  return <group ref={scene} position-y={-0.5}>
    <group ref={room}>
      <group scale={0.65}>
        <primitive object={model.scene} />
      </group>
      <Lights />
      <mesh
        name='shadow'
        rotation-x={-Math.PI / 2}
        rotation-z={Math.PI / 4}
        position={[-0.0075, -0.2, -0.0225]}
        //position={[-0.65, -0.2, -0.7]}
        scale={[1.0075, 1.0225, 1]}
      //scale={[1.1, 2, 1]}
      >
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          color='#000000'
          opacity={0.15}
          transparent
        />
      </mesh>
    </group>
  </group>
}

useGLTF.preload('/models/portfolioRoom.glb', true)
