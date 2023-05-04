import { Canvas } from '@react-three/fiber'
import { Text, ContactShadows, Float, Environment, PresentationControls } from '@react-three/drei'
import { Box } from '@mui/material'
import { lazy, Suspense, useRef } from 'react'
import { MathUtils, PerspectiveCamera } from 'three'
import type { Group } from 'three'
const Model = lazy(() => import('../components/test/model'))

export default function Test() {
  const group = useRef<Group>(null)

  return <Box
    component='div'
    sx={{
      display: 'flex',
      position: 'relative',
      background: 'ivory',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      '& iframe': {
        width: '1024px',
        height: '670px',
        border: 'none',
        borderRadius: '20px',
        backgroundColor: '#000000'
      }
    }}
  >
    <Box
      component='div'
      sx={{
        position: 'absolute',
        height: '100svh',
        width: '100%',
        zIndex: '0'
      }}
    >
      <Canvas
        camera={{
          near: 0.1,
          far: 2000,
          position: [ -3, 1.5, 3 ],
        }}
        style={{
          touchAction: 'none'
        }}
        onCreated={(state) => {
          // const fov = 45
          const planeAspectRatio = 16 / 9 as number

          (state.camera as PerspectiveCamera).aspect = window.innerWidth / window.innerHeight
            
          if ((state.camera as PerspectiveCamera).aspect > planeAspectRatio) {
            // window too large
            (state.camera as PerspectiveCamera).fov = 60
          } else {
            if(group.current) {
              group.current.position.y = 0
            }
            // window too narrow
            const cameraHeight = Math.tan(MathUtils.degToRad(45 / 2))
            const ratio = (state.camera as PerspectiveCamera).aspect / planeAspectRatio as number
            const newCameraHeight: number = cameraHeight / ratio as number
            (state.camera as PerspectiveCamera).fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2
          }

          (state.camera as PerspectiveCamera).updateProjectionMatrix()

          window.addEventListener('resize', () => {	
            (state.camera as PerspectiveCamera).aspect = window.innerWidth / window.innerHeight
            
            if ((state.camera as PerspectiveCamera).aspect > planeAspectRatio) {
              // window too large
              (state.camera as PerspectiveCamera).fov = 60
              if(group.current) {
                group.current.position.y = 0.4
              }
            } else {
              if(group.current) {
                group.current.position.y = 0
              }
              // window too narrow
              const cameraHeight = Math.tan(MathUtils.degToRad(45 / 2))
              const ratio = (state.camera as PerspectiveCamera).aspect / planeAspectRatio as number
              const newCameraHeight: number = cameraHeight / ratio as number
              (state.camera as PerspectiveCamera).fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2
            }
          })
        }}
      >
        <Environment preset='city' />
        <color args={[ '#599da0' ]} attach='background' />

        <group ref={group} position-y={0.4}>
          <PresentationControls
            global
            rotation={[ 0.13, 0.1, 0 ]}
            polar={[ -0.4, 0.2 ]}
            azimuth={[ -1, 0.75 ]}
            config={{
              mass: 2,
              tension: 400
            }}
            snap={{
              mass: 4,
              tension: 400
            }}
          >
            <Float rotationIntensity={0.4}>
              <rectAreaLight
                width={2.5}
                height={1.65}
                intensity={65}
                color='#00ADB5'
                rotation={[ 0.1, Math.PI, 0 ]}
                position={[ 0, 0.55, -1.15 ]}
              />

              <Suspense fallback={"loading"}>
                <Model />
              </Suspense>

              <Text
                font='/fonts/bangers-v20-latin-regular.woff'
                fontSize={1}
                position={[ 2, 0.75, 0.75 ]}
                rotation-y={-1.25}
                maxWidth={2}
                textAlign='center'
              >
                Julian Smith
              </Text>
            </Float>
          </PresentationControls>

          <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
          />
        </group>
      </Canvas>
    </Box>
  </Box>
}