import { useHelper } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { PointLight, SpotLight, PointLightHelper, SpotLightHelper, Color } from 'three'
import { useRef, useEffect } from 'react'
import { useControls, folder } from 'leva'
import { gsap, Expo, Sine } from 'gsap'
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
      spotLightLight: { value: {r: 255, g: 247, b: 218}},
      spotLightIntensityLight: { value: 5 },
      pointLightLight: { value: {r: 255, g: 249, b: 252}},
      pointLightPowerLight: { value: 625 },
      toneMappingIntensityLight: {
        value: 0.2,
        min: 0,
        max: 1.5
      }
    }),
    'Dark Mode': folder({
      spotLightDark: { value: {r: 255, g: 255, b: 255}},
      spotLightIntensityDark: { value: 5 },
      pointLightDark: { value: {r: 8, g: 33, b: 190}},
      pointLightPowerDark: { value: 2500 },
      toneMappingIntensityDark: {
        value: 0.05,
        min: 0,
        max: 1.5
      }
    })
  }, { collapsed: true })
  
  const sLight = useRef<SpotLight>(null!)
  const pLight = useRef<PointLight>(null!)
  const pLight2 = useRef<PointLight>(null!)
  useHelper(spotLightHelper && sLight, SpotLightHelper)
  useHelper(officeLightHelper && pLight, PointLightHelper)
  useHelper(rockWallLightHelper && pLight2, PointLightHelper)

  const mode = usePortfolioStore(state => state.mode)
  const gl = useThree(state => state.gl)

  useEffect(() => {
    if(pLight.current && pLight2.current && sLight.current) {
      if(mode) {
        gsap.to(
          [pLight.current.color, pLight2.current.color],
          {
            r: pointLightLight.r / 255,
            g: pointLightLight.g / 255,
            b: pointLightLight.b / 255,
            duration: transitionDuration
          }
        )
        gsap.to(
          [pLight.current, pLight2.current],
          {
            power: pointLightPowerLight,
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
            ease: Sine.easeIn,
            duration: transitionDuration
          }
        )
      }else {
        gsap.to(
          [pLight.current.color, pLight2.current.color],
          {
            r: pointLightDark.r / 255,
            g: pointLightDark.g / 255,
            b: pointLightDark.b / 255,
            duration: transitionDuration
          }
        )
        gsap.to(
          [pLight.current, pLight2.current],
          {
            power: pointLightPowerDark,
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
            ease: Expo.easeOut,
            duration: transitionDuration
          }
        )
      }
    }
  }, [
    mode,
    pointLightLight,
    pointLightDark,
    spotLightLight,
    spotLightDark,
    toneMappingIntensityLight,
    toneMappingIntensityDark,
    pointLightPowerLight,
    pointLightPowerDark,
    spotLightIntensityLight,
    spotLightIntensityDark
  ])

  return <>
    <spotLight
      ref={sLight}
      color={mode ?
        new Color(
          spotLightLight.r / 255,
          spotLightLight.g / 255,
          spotLightLight.b / 255
        )
        :
        new Color(
          spotLightDark.r / 255,
          spotLightDark.g / 255,
          spotLightDark.b / 255
        )
      }
      intensity={mode ? spotLightIntensityLight : spotLightIntensityDark}
      castShadow
      position={[3.15, 3.35, -5]}
      target-position={[0, 0, 1.8]}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.04}
      shadow-radius={1.5}
    />
    <pointLight
      ref={pLight}
      color={mode ?
        new Color(
          pointLightLight.r / 255,
          pointLightLight.g / 255,
          pointLightLight.b / 255
        )
        :
        new Color(
          pointLightDark.r / 255,
          pointLightDark.g / 255,
          pointLightDark.b / 255
        )
      }
      power={mode ? pointLightPowerLight : pointLightPowerDark}
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
    <pointLight
      ref={pLight2}
      color={mode ?
        new Color(
          pointLightLight.r / 255,
          pointLightLight.g / 255,
          pointLightLight.b / 255
        )
        :
        new Color(
          pointLightDark.r / 255,
          pointLightDark.g / 255,
          pointLightDark.b / 255
        )
      }
      power={mode ? pointLightPowerLight : pointLightPowerDark}
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