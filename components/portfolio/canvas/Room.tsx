import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial, Group } from 'three'
import { GLTF } from 'three-stdlib'
import { useControls } from 'leva'
import { useRef, useEffect, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { shallow } from 'zustand/shallow'
import Lights from './Lights'
import { usePortfolioStore } from '../../../stores/usePortfolio'

interface LoadedGLTF extends GLTF {
  nodes: any,
  materials: any
}

gsap.registerPlugin(ScrollTrigger)

export default memo(function Room(): JSX.Element {
  const { ledColor, setLEDColor, setLoaded, modelChildren } = usePortfolioStore(state => ({
    ledColor: state.ledColor,
    setLEDColor: state.setLEDColor,
    setLoaded: state.setLoaded,
    modelChildren: state.modelChildren
  }), shallow)

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
  const modelRef = useRef<LoadedGLTF>(null!)
  modelRef.current = model
  if (Object.keys(modelChildren).length === 0) {
    modelRef.current.scene.children.forEach((child) => {
      child.castShadow = true
      child.receiveShadow = true
      modelChildren[child.name] = child
      child.scale.set(0, 0, 0)

      child.children.forEach((child) => {
        child.castShadow = true
        child.receiveShadow = true
      })

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
      } else if (child.name === 'Carpet') {
        const carpetMaterial = (child as Mesh).material as MeshStandardMaterial
        carpetMaterial.color.set(ledColor)
        carpetMaterial.color.multiplyScalar(0.25)
      }
    })
  } else {
    modelChildren['DeskItems'].children[6].material.emissive.set(ledColor)
    modelChildren['DeskItems'].children[9].material.color.set(Screen)
    modelChildren['Carpet'].material.color.set(ledColor)
    modelChildren['Carpet'].material.color.multiplyScalar(0.25)
  }

  const lerpCurrent = useRef<number>(0)
  const lerpTarget = useRef<number>(0)
  const lerpEase = useRef<number>(0.1)
  const scene = useRef<Group>(null!)
  const room = useRef<Group>(null!)
  const shadow = useRef<Mesh>(null!)

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

  useEffect(() => {
    modelRef.current.scene.rotation.y = -Math.PI / 4
    modelChildren['Scene'] = scene.current
    modelChildren['Room'] = room.current
    modelChildren['Shadow'] = shadow.current
    modelChildren['Shadow'].scale.set(0, 0, 0)
    scene.current.position.y = 0.25

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

      const secondRoomTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'center center'
        }
      }).to(
        shadow.current.scale,
        {
          y: 2.0275,
          duration: 0.3
        },
        'structure2'
      ).to(
        shadow.current.position,
        {
          x: -0.7,
          z: -0.75,
          duration: 0.3
        },
        'structure2'
      )

      modelChildren['Structure2'].scale.x = 0.0001
      const enterStructure2 = gsap.to(
        modelChildren['Structure2'].scale,
        {
          x: 1,
          duration: 0.3
        }
      )

      const enterClimbingWall = gsap.to(
        modelChildren['ClimbingWall'].scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }
      )

      const enterBench = gsap.to(
        modelChildren['Bench'].scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }
      )

      const enterOrangeHolds = gsap.to(
        modelChildren['OrangeHolds'].scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }
      )

      const enterRedHolds = gsap.to(
        modelChildren['RedHolds'].scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }
      )

      const enterPurpleHolds = gsap.to(
        modelChildren['PurpleHolds'].scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }
      )

      const enterBlueHolds = gsap.to(
        modelChildren['BlueHolds'].scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }
      )

      const enterGreenHolds = gsap.to(
        modelChildren['GreenHolds'].scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }
      )

      secondRoomTimeline.add(enterStructure2, 'structure2')
      secondRoomTimeline.add(enterClimbingWall, 'bench-and-wall')
      secondRoomTimeline.add(enterBench, 'bench-and-wall')
      secondRoomTimeline.add(enterOrangeHolds, '-=0.1')
      secondRoomTimeline.add(enterRedHolds, '-=0.1')
      secondRoomTimeline.add(enterPurpleHolds, '-=0.1')
      secondRoomTimeline.add(enterBlueHolds, '-=0.1')
      secondRoomTimeline.add(enterGreenHolds, '-=0.1')
    })

    setLoaded(true)

    return () => {
      mm.revert()
    }
  }, [])

  return <group ref={scene} position-y={-0.5}>
    <group ref={room}>
      <group scale={0.65}>
        <primitive object={model.scene} />
      </group>
      <Lights />
      <mesh
        ref={shadow}
        name='shadow'
        rotation-x={-Math.PI / 2}
        rotation-z={Math.PI / 4}
        position={[-0.0075, -0.2, -0.0225]}
        scale={[1.0075, 1.0225, 1]}
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
})

useGLTF.preload('/models/portfolioRoom.glb', true)
