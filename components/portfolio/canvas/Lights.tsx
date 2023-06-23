import { useHelper } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { PointLight, SpotLight, DirectionalLight, PointLightHelper, SpotLightHelper, Color, DirectionalLightHelper } from 'three'
import { useRef, useEffect } from 'react'
import { useControls, folder } from 'leva'
import { gsap } from 'gsap'
import { usePortfolioStore } from '../../../stores/usePortfolio'

export default function Lights(): JSX.Element {
  const {
    spotLightHelper,
    officeLightHelper,
    rockWallLightHelper,
    spotLightLight,
    spotLightIntensityLight,
    pointLightLight,
    pointLightPowerLight,
    directionalIntensityLight,
    directionalIntensityDark,
    toneMappingIntensityLight,
    spotLightDark,
    spotLightIntensityDark,
    pointLightDark,
    pointLightPowerDark,
    toneMappingIntensityDark,
    transitionDuration
  } = useControls('Lights', {
    spotLightHelper: { value: false },
    officeLightHelper: { value: false },
    rockWallLightHelper: { value: false },
    transitionDuration: { value: 0.5 },
    'Light Mode': folder({
      spotLightLight: { value: { r: 255, g: 247, b: 218 } },
      spotLightIntensityLight: { value: 5 },
      pointLightLight: { value: { r: 255, g: 249, b: 252 } },
      pointLightPowerLight: { value: 625 },
      directionalIntensityLight: { value: 4 },
      toneMappingIntensityLight: {
        value: 0.2,
        min: 0,
        max: 1.5
      }
    }),
    'Dark Mode': folder({
      spotLightDark: { value: { r: 255, g: 255, b: 255 } },
      spotLightIntensityDark: { value: 5 },
      pointLightDark: { value: { r: 8, g: 33, b: 190 } },
      pointLightPowerDark: { value: 2500 },
      directionalIntensityDark: { value: 16 },
      toneMappingIntensityDark: {
        value: 0.05,
        min: 0,
        max: 1.5
      }
    })
  }, { collapsed: true })

  const sLight = useRef<SpotLight>(null!)
  const pLight = useRef<PointLight>(null!)
  const directionalLight = useRef<DirectionalLight>(null!)
  useHelper(spotLightHelper && sLight, SpotLightHelper)
  useHelper(officeLightHelper && pLight, PointLightHelper)
  useHelper(rockWallLightHelper && directionalLight, DirectionalLightHelper)

  const gl = useThree(state => state.gl)

  useEffect(() => {
    const unsubscribeMode = usePortfolioStore.subscribe(
      state => state.mode,
      (mode) => {
        let ctx = gsap.context(() => {
          if (mode) {
            gsap.to(
              [pLight.current.color, directionalLight.current.color],
              {
                r: pointLightLight.r / 255,
                g: pointLightLight.g / 255,
                b: pointLightLight.b / 255,
                duration: transitionDuration
              }
            )
            gsap.to(
              [pLight.current],
              {
                power: pointLightPowerLight,
                duration: transitionDuration
              }
            )
            gsap.to(
              [directionalLight.current],
              {
                intensity: directionalIntensityLight,
                duration: transitionDuration
              }
            )
            gsap.to(
              [sLight.current.color],
              {
                r: spotLightLight.r / 255,
                g: spotLightLight.g / 255,
                b: spotLightLight.b / 255,
                duration: transitionDuration
              }
            )
            gsap.to(
              [sLight.current],
              {
                intensity: spotLightIntensityLight,
                duration: transitionDuration
              }
            )
            gsap.to(
              [gl],
              {
                toneMappingExposure: toneMappingIntensityLight,
                ease: 'sine.easeIn',
                duration: transitionDuration
              }
            )
          } else {
            gsap.to(
              [pLight.current.color, directionalLight.current.color],
              {
                r: pointLightDark.r / 255,
                g: pointLightDark.g / 255,
                b: pointLightDark.b / 255,
                duration: transitionDuration
              }
            )
            gsap.to(
              [pLight.current],
              {
                power: pointLightPowerDark,
                duration: transitionDuration
              }
            )
            gsap.to(
              [directionalLight.current],
              {
                intensity: directionalIntensityDark,
                duration: transitionDuration
              }
            )
            gsap.to(
              [sLight.current.color],
              {
                r: spotLightDark.r / 255,
                g: spotLightDark.g / 255,
                b: spotLightDark.b / 255,
                duration: transitionDuration
              }
            )
            gsap.to(
              [sLight.current],
              {
                intensity: spotLightIntensityDark,
                duration: transitionDuration
              }
            )
            gsap.to(
              [gl],
              {
                toneMappingExposure: toneMappingIntensityDark,
                ease: 'expo.easeOut',
                duration: transitionDuration
              }
            )
          }
        })

        return () => {
          ctx.revert()
        }
      }
    )

    return () => {
      unsubscribeMode()
    }
  }, [])

  useEffect(() => {
    directionalLight.current.target.position.set(-0.75, 0, -1.25)
    directionalLight.current.target.updateMatrixWorld()
  }, [])

  return <>
    <spotLight
      ref={sLight}
      color={new Color(
        spotLightLight.r / 255,
        spotLightLight.g / 255,
        spotLightLight.b / 255
      )}
      intensity={spotLightIntensityLight}
      castShadow
      position={[3.15, 3.35, -5]}
      target-position={[0, 0, 1.8]}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.04}
      shadow-radius={1.5}
    />
    <pointLight
      ref={pLight}
      color={new Color(
        pointLightLight.r / 255,
        pointLightLight.g / 255,
        pointLightLight.b / 255
      )}
      power={pointLightPowerLight}
      castShadow
      position={[0, 1.7, 0]}
      shadow-camera-far={20}
      shadow-camera-near={0.1}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.02}
      shadow-radius={25}
      distance={8.5}
      decay={11.2}
    />
    <directionalLight
      ref={directionalLight}
      color={new Color(
        pointLightLight.r / 255,
        pointLightLight.g / 255,
        pointLightLight.b / 255
      )}
      intensity={directionalIntensityLight}
      castShadow
      position={[-1.5, 1.5, -2.5]}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.01}
    />
  </>
}
