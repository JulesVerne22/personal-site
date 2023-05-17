import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { PerspectiveCamera, OrthographicCamera, Group } from 'three'

interface PortfolioState {
  oCamera: OrthographicCamera | undefined
  pCamera: PerspectiveCamera | undefined
  scene: Group | undefined
  setOCamera: (oCamera: OrthographicCamera) => void
  setPCamera: (oCamera: PerspectiveCamera) => void
  setScene: (scene: Group) => void
}

export const usePortfolioStore = create<PortfolioState>()(subscribeWithSelector((set) => {
  return {
    oCamera: undefined,
    pCamera: undefined,
    scene: undefined,
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
    }
  }
}))