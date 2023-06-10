import { Box } from '@mui/material'
import { Canvas } from '@react-three/fiber'
import { CineonToneMapping } from 'three'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import Camera from './canvas/Camera'
import World from './canvas/World'
import Page from './html/Page'

export default function Portfolio(): JSX.Element {
  const [debug, setDebug] = useState<undefined | string | string[]>(undefined)
  const router = useRouter()

  useEffect(() => {
    if(router.isReady) {
      setDebug(router.query.debug)
    }
  }, [router])

  return <>
    <Box component='div' sx={{ '& > div': { marginTop: '50px' }}}>
      <Leva hidden={typeof debug === 'undefined'} collapsed />
    </Box>
    <Box
      component='div'
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100svh',
        top: 0,
        zIndex: 1
      }}
    >
      <Canvas
        shadows
        gl={{
          useLegacyLights: true,
          toneMapping: CineonToneMapping
        }}
        onCreated={state => {
          state.gl.toneMappingExposure = 0.2
        }}
      >
        {typeof debug === 'undefined' ?
          null
        :
          <Perf matrixUpdate position='bottom-left' />
        }
        <Camera />
        <World />
      </Canvas>
    </Box>
    <Page />
  </>
}
