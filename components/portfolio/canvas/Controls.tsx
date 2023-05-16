import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolioStore } from '../../../stores/usePortfolio'

export default function Controls(): JSX.Element {
  const scene = usePortfolioStore(state => state.scene)

  gsap.registerPlugin(ScrollTrigger)
  const timeline = gsap.timeline()

  if(typeof scene !== 'undefined') {
    timeline.to(scene.position, {
      x: 1.5,
      scrollTrigger: {
        trigger: '.first-move',
        markers: true,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6
      }
    })
  }

  return <></>  
}