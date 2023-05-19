import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { PerspectiveCamera, OrthographicCamera, Group } from 'three'

interface PortfolioState {
  oCamera: OrthographicCamera | undefined
  pCamera: PerspectiveCamera | undefined
  scene: Group | undefined
  mode: boolean
  setOCamera: (oCamera: OrthographicCamera) => void
  setPCamera: (oCamera: PerspectiveCamera) => void
  setScene: (scene: Group) => void
  toggleMode: () => void
}

export const usePortfolioStore = create<PortfolioState>()(subscribeWithSelector((set) => {
  return {
    oCamera: undefined,
    pCamera: undefined,
    scene: undefined,
    mode: true,
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
    }
  }
}))