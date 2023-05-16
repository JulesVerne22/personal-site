import { useHelper } from '@react-three/drei'
import { PointLight, SpotLight, PointLightHelper, SpotLightHelper } from 'three'
import { useRef } from 'react'
import { useControls } from 'leva'

export default function Lights(): JSX.Element {
  const {
    spotLightHelper,
    officeLightHelper,
    rockWallLightHelper,
  } = useControls('Lights', {
    spotLightHelper: { value: false },
    officeLightHelper: { value: false },
    rockWallLightHelper: { value: false }
  })
  
  const sLight = useRef<SpotLight>(null!)
  const pLight = useRef<PointLight>(null!)
  const pLight2 = useRef<PointLight>(null!)
  useHelper(spotLightHelper && sLight, SpotLightHelper)
  useHelper(officeLightHelper && pLight, PointLightHelper)
  useHelper(rockWallLightHelper && pLight2, PointLightHelper)

  return <>
    <spotLight
      ref={sLight}
      args={['#fff7da', 0.6]}
      castShadow
      position={[3.15, 3.35, -5]}
      target-position={[0, 0, 1.8]}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.04}
      shadow-radius={1.5}
    />
    <pointLight
      ref={pLight}
      color='#fff9fc'
      power={50}
      castShadow
      position={[0, 1.7, 0]}
      shadow-camera-far={20}
      shadow-camera-near={0.1}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.005}
      shadow-radius={25}
      distance={8.5}
      decay={11.2}
    />
    <pointLight
      ref={pLight2}
      color='#fff9fc'
      power={50}
      castShadow
      position={[-1.5, 1.5, -2.5]}
      shadow-camera-far={20}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.005}
      distance={4}
      decay={6.5}
    />
  </>
}