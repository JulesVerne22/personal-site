import { Environment as Env } from '@react-three/drei'

export default function Environment(): JSX.Element {
  return <>
    <spotLight
      args={['#fff7da', 0.6]}
      castShadow
      position={[1.3, 1.1, -2]}
      target-position={[0, -0.25, 1]}
      shadow-camera-far={4}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.04}
      shadow-radius={1.5}
    />
    <pointLight
      color='#fff9fc'
      power={50}
      castShadow
      position={[0, 0.6, 0]}
      shadow-camera-far={20}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.005}
      distance={4}
      decay={11.2}
    />
    <pointLight
      color='#fff9fc'
      power={50}
      castShadow
      position={[-0.8, 0.5, -1.3]}
      shadow-camera-far={20}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.005}
      distance={2}
      decay={6.5}
    />
    <Env
      files={'textures/environment.hdr'}
      path='/'
    />
  </>
}