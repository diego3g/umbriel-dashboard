import { ColorMode, ColorModeScript } from '@chakra-ui/react'
import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { config } from '../styles/config'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={config.initialColorMode as ColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
