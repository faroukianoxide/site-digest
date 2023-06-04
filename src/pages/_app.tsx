import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          fontFamily: 'monospace'
        }
      }
    }
    
  })


  return <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
}
