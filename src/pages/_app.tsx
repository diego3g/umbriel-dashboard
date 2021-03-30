import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SidebarMobileDrawerProvider } from '../contexts/SidebarMobileDrawerContext';
import { theme } from '../styles/theme';
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SidebarMobileDrawerProvider>
        <Component {...pageProps} />
      </SidebarMobileDrawerProvider>
    </ChakraProvider>
  )
}