import * as React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../config/createEmotionCache'

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='emotion-insertion-point' content='' />
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
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App: any) => function EnhanceApp(props: any) {
      return <App emotionCache={cache} {...props} />
    }
  })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}
