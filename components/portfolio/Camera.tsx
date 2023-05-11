import { useControls } from 'leva'
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Camera(): JSX.Element {
  const { orthographic, frustrum } = useControls('Camera', {
    orthographic: false,
    frustrum: {
      value: 5,
      min: 0,
      max: 10
    }
  })

  const { size } = useThree()

  return <>
    <OrthographicCamera
      manual
      makeDefault={orthographic}
      top={frustrum / 2}
      right={size.width / size.height * frustrum / 2}
      bottom={-frustrum / 2}
      left={-size.width / size.height * frustrum / 2}
      near={-100}
      far={100}
      position={[0, 2, 3]}
      onUpdate={c => c.updateProjectionMatrix()}
    />
    <PerspectiveCamera
      manual
      makeDefault={!orthographic}
      fov={35}
      aspect={size.width / size.height}
      near={0.1}
      far={1000}
      position={[0, 2, 3]}
      onUpdate={c => c.updateProjectionMatrix()}
    />
  </>
}