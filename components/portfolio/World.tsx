import Environment from './Environment'
import Room from './Room'

export default function World(): JSX.Element {
  return <>
    <Room />
    <Environment />
  </>
}