import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { PerspectiveCamera, OrthographicCamera, Group } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface PortfolioState {
  mode: boolean
  ledColor: string
  toggleMode: () => void
  setLEDColor: (color: string) => void
}

export const usePortfolioStore = create<PortfolioState>()(subscribeWithSelector((set) => {
  return {
    mode: true,
    ledColor: '#00adb5',
    toggleMode: () => {
      set((state) => {
        return {
          mode: !state.mode
        }
      })
    },
    setLEDColor: (color: string) => {
      set(() => {
        return {
          ledColor: color
        }
      })
    }
  }
}))
