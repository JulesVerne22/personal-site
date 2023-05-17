import Environment from './Environment'
import Room from './Room'
import Controls from './Controls'

export default function World(): JSX.Element {
  return <>
    <Room />
    <Environment />
    <Controls />
  </>
}