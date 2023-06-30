import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import Lenis from '@studio-freight/lenis'

interface PortfolioState {
  mode: boolean
  ledColor: string
  loaded: boolean
  modelChildren: any
  lenis: Lenis | null
  toggleMode: () => void
  setLEDColor: (color: string) => void
  setLoaded: (loaded: boolean) => void
  setLenis: (lenis: Lenis) => void
}

export const usePortfolioStore = create<PortfolioState>()(subscribeWithSelector((set) => {
  return {
    mode: true,
    ledColor: '#00adb5',
    loaded: false,
    modelChildren: {},
    lenis: null,
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
    },
    setLoaded: (loaded: boolean) => {
      set(() => {
        return {
          loaded: loaded
        }
      })
    },
    setLenis: (lenis: Lenis) => {
      set(() => {
        return {
          lenis: lenis
        }
      })
    }
  }
}))
