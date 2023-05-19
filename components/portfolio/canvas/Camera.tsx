import { useControls } from 'leva'
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { OrthographicCamera as oCamera, PerspectiveCamera as pCamera } from 'three'
import { usePortfolioStore } from '../../../stores/usePortfolio'

export default function Camera(): JSX.Element {
  const { orthographic, frustrum } = useControls('Camera', {
    orthographic: false,
    frustrum: {
      value: 5,
      min: 0,
      max: 10
    }
  }, { collapsed: true })

  const setOCamera = usePortfolioStore(state => state.setOCamera)
  const setPCamera = usePortfolioStore(state => state.setPCamera)
  const oCamera = useRef<oCamera>(null!)
  const pCamera = useRef<pCamera>(null!)
  const { size } = useThree()

  useEffect(() => {
    setOCamera(oCamera.current)
    setPCamera(pCamera.current)
  }, [])

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
  </>
}
