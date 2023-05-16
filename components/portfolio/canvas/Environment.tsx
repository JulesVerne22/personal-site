import { Environment as Env } from '@react-three/drei'
import { useControls } from 'leva'

export default function Environment(): JSX.Element {
  const {
    grid,
    axes
  } = useControls('Environment', {
    grid: { value: false },
    axes: { value: false }
  })

  return <>
    <Env
      files={'textures/environment.hdr'}
      path='/'
    />
    {grid && <gridHelper args={[20, 20, '#ff0000', '#ff0000']} />}
    {axes && <axesHelper args={[10]} />}
  </>
}