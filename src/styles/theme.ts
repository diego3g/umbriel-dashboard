import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"
import { config } from './config';

export const theme = extendTheme({
  config,
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  components: {
    Input: {
      baseStyle: props => ({
        bgColor: 'black',
        borderWidth: 1,
        borderColor: mode('white', 'gray.300')(props),
      })
    },
  },
  styles: {
    global: (props) =>  ({
      body: {
        bg: mode('gray.50', 'gray.900')(props),
        color: 'gray.50'
      }
    }),
  },
})