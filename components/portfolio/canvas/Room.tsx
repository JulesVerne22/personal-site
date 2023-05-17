import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial, Group } from 'three'
import type { GLTF } from 'three-stdlib'
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
  const { LEDs, Screen1, Screen2 } = useControls('Office', {
    LEDs: {
      value: '#00ADB5'
    },
    Screen1: {
      value: '#004444'
    },
    Screen2: {
      value: '#004444'
    },
  })

  const room = useGLTF('/models/portfolioRoom.glb', true) as LoadedGLTF
  room.scene.rotation.y = -Math.PI / 4
  room.scene.traverse((child) => {
    if(child.type === 'Mesh') {
      child.castShadow = true
      child.receiveShadow = true;
      ((child as Mesh).material as MeshStandardMaterial).envMapIntensity = 0.16

      if(child.name === 'SidePanel') {
        const childMaterial = (child as Mesh).material = new MeshPhysicalMaterial()
        childMaterial.roughness = 0.8
        childMaterial.color.set(0x666666)
        childMaterial.ior = 1.15
        childMaterial.transmission = 1
        childMaterial.opacity = 1
      }else if(child.name === 'ComputerLEDs') {
        const childMaterial = (child as Mesh).material = new MeshStandardMaterial()
        childMaterial.roughness = 1
        childMaterial.color.set(0x000000)
        childMaterial.emissive.set(LEDs)
      }else if(child.name === 'Screen1') {
        const childMaterial = (child as Mesh).material = new MeshBasicMaterial()
        childMaterial.color.set(Screen1)
      }else if(child.name === 'Screen2') {
        const childMaterial = (child as Mesh).material = new MeshBasicMaterial()
        childMaterial.color.set(Screen2)
      }
    }
  })

  const lerpCurrent = useRef<number>(0)
  const lerpTarget = useRef<number>(0)
  const lerpEase = useRef<number>(0.1)
  const scene = useRef<Group>(null!)
  const setScene = usePortfolioStore(state => state.setScene)

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
    setScene(scene.current)
  }, [])

  return <group ref={scene} position-y={-0.5}>
    <group scale={0.65}>
      <primitive object={room.scene} />
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
  
}

useGLTF.preload('/models/portfolioRoom.glb', true)