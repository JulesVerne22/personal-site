import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { PerspectiveCamera, OrthographicCamera, Group } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface PortfolioState {
  oCamera: OrthographicCamera | undefined
  pCamera: PerspectiveCamera | undefined
  scene: Group | undefined
  room: Group | undefined
  mode: boolean
  ledColor: string
  setOCamera: (oCamera: OrthographicCamera) => void
  setPCamera: (oCamera: PerspectiveCamera) => void
  setScene: (scene: Group) => void
  setRoom: (room: Group) => void
  toggleMode: () => void
  setLEDColor: (color: string) => void
}

export const usePortfolioStore = create<PortfolioState>()(subscribeWithSelector((set) => {
  return {
    oCamera: undefined,
    pCamera: undefined,
    scene: undefined,
    room: undefined,
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
    setRoom: (room: Group) => {
      set(() => {
        return {
          room: room
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