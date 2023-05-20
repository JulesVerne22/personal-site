import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { PerspectiveCamera, OrthographicCamera, Group, Color } from 'three'

interface PortfolioState {
  oCamera: OrthographicCamera | undefined
  pCamera: PerspectiveCamera | undefined
  scene: Group | undefined
  mode: boolean
  ledColor: string
  setOCamera: (oCamera: OrthographicCamera) => void
  setPCamera: (oCamera: PerspectiveCamera) => void
  setScene: (scene: Group) => void
  toggleMode: () => void
  setLEDColor: (color: string) => void
}

export const usePortfolioStore = create<PortfolioState>()(subscribeWithSelector((set) => {
  return {
    oCamera: undefined,
    pCamera: undefined,
    scene: undefined,
    mode: true,
    ledColor: '#00adb5',
    setOCamera: (oCamera: OrthographicCamera) => {
      set(() => {
        return {
          oCamera: oCamera
        }
      })
    },
    setPCamera: (pCamera: PerspectiveCamera) => {
      set(() => {
        return {
          pCamera: pCamera
        }
      })
    },
    setScene: (scene: Group) => {
      set(() => {
        return {
          scene: scene
        }
      })
    },
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