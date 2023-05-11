import { useGLTF } from '@react-three/drei'
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial } from 'three'
import type { GLTF } from 'three-stdlib'
import { useControls } from 'leva'

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
      child.receiveShadow = true

      if(child.name === 'SidePanel') {
        const childMaterial = (child as Mesh).material = new MeshPhysicalMaterial()
        childMaterial.roughness = 0.2
        childMaterial.color.set(0x666666)
        childMaterial.ior = 2
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

  return <>
    <group position-y={-0.25} scale={0.33}>
      <primitive object={room.scene} />
    </group>
  </>
  
}

useGLTF.preload('/models/portfolioRoom.glb', true)