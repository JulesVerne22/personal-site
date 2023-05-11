import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { CineonToneMapping } from 'three'
import Camera from './Camera'
import World from './World'

export default function Portfolio(): JSX.Element {
  return <Canvas
    shadows
    gl={{
      useLegacyLights: true,
      toneMapping: CineonToneMapping,
      toneMappingExposure: 1.75
    }}
  >
    <OrbitControls />
    <Camera />

    <World />
  </Canvas>
}