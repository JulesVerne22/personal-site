import Document, { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { AppType } from 'next/app'
import * as React from 'react'
import { MyAppProps } from './_app'
import createEmotionCache from '../config/createEmotionCache'

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps): JSX.Element {
  return (
    <Html lang='en'>
      <Head>
        <meta name='description' content='Julian Smith&apos;s personal site.' />
        <meta name='author' content='Julian Smith' />
        <meta name='keywords' content='julian smith, portfolio, julian, smith' />
        <title>Julian&apos;s Site</title>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='emotion-insertion-point' content='' />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) => function EnhanceApp(props) {
      return <App emotionCache={cache} {...props} />
    }
  })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => {
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  })

  return {
    ...initialProps,
    emotionStyleTags
  }
}
