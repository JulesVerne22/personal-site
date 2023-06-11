import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial, Group } from 'three'
import { GLTF } from 'three-stdlib'
import { useControls } from 'leva'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Lights from './Lights'
import { usePortfolioStore } from '../../../stores/usePortfolio'


interface LoadedGLTF extends GLTF {
  nodes: any,
  materials: any
}

export default function Room(): JSX.Element {
  const { ledColor, setLEDColor} = usePortfolioStore(state => ({
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

    if(child.name === 'DeskItems') {
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
    }else if(child.name === 'FloorItems') {
      const carpetMaterial = (child.children[0] as Mesh).material as MeshStandardMaterial
      carpetMaterial.color.set(ledColor)
      carpetMaterial.color.multiplyScalar(0.25)
    }
  })

  const lerpCurrent = useRef<number>(0)
  const lerpTarget = useRef<number>(0)
  const lerpEase = useRef<number>(0.1)
  const scene = useRef<Group>(null!)
  const room = useRef<Group>(null!)

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

  return <group ref={scene} position-y={-0.5}>
    <group ref={room}>
      <group scale={0.65}>
        <primitive object={model.scene} />
      </group>
      <Lights />
      <mesh
        name='shadow'
        rotation-x={-Math.PI/2}
        rotation-z={Math.PI/4}
        position={[-0.65, -0.2, -0.7]}
        scale={[1.1, 2, 1]}
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
