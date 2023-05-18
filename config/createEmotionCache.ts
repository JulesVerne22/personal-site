import createCache from '@emotion/cache'

const isBrowser = typeof document !== 'undefined'

export default function createEmotionCache() {
  let insertionPoint

  if(isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    ) as HTMLMetaElement
    insertionPoint = emotionInsertionPoint
  }

  return createCache({ key: 'mui-style', insertionPoint })
}