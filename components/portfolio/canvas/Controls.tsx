import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { usePortfolioStore } from '../../../stores/usePortfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Controls(): JSX.Element {
  const {
    oCamera,
    pCamera
  } = usePortfolioStore(state => ({
    oCamera: state.oCamera,
    pCamera: state.pCamera
  }))

  const size = useThree(state => state.size)

  if(typeof oCamera !== 'undefined' && typeof pCamera !== 'undefined') {
    gsap.fromTo(
      [oCamera.position, pCamera.position],
      {
        x: 0
      },
      {
        x: () => {
          return size.width * -0.0012
        },
        scrollTrigger: {
          trigger: '.first-move',
          scrub: 0.6,
          markers: true,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true
        }
      }
    )
  }

  useEffect(() => {
    
  }, [oCamera, pCamera, size])

  return <></>  
}