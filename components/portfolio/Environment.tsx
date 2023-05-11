export default function Environment(): JSX.Element {
  return <>
    <directionalLight
      args={['#fff9fc', 1]}
      castShadow
      position={[2, 2, -4]}
      shadow-camera-far={20}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.05}
    />
    <pointLight
      args={['#fff9fc', 0.25]}
      castShadow
      position={[1, 1, 1]}
      shadow-camera-far={20}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.05}
    />
    <pointLight
      args={['#fff9fc', 0.5]}
      castShadow
      position={[-1.5, 1.5, -2]}
      shadow-camera-far={20}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.005}
    />
    <ambientLight args={['#ffffff', 0.2]} />
  </>
}