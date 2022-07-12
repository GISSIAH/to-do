import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({

    shape: {
      borderRadius: 8
    },
    palette: {
      mode:"dark",
      common: {
        white: "#f1faee"
      },
      primary: {
        main: "#1d3557",
        light: "#457b9d"
      },
      secondary: {
        main: "#e63946",
      },


    },
    typography: {
      fontFamily: "Space Grotesk, sans-serif",
      h1: {
        
        fontSize: '4.50rem', [`@media screen and (max-width: 1440px)`]: {
          fontSize: "3.8rem"
        }, [`@media screen and (max-width: 1280px)`]: {
          fontSize: "3.5rem"
        }, [`@media screen and (max-width: 1024px)`]: {
          fontSize: "3.5rem"
        }, [`@media screen and (max-width: 768px)`]: {
          fontSize: "3.5rem"
        }, [`@media screen and (max-width: 600px)`]: {
          fontSize: "3.25rem"
        }, [`@media screen and (max-width: 375px)`]: {
          fontSize: "2.9rem"
        },
        fontWeight: 700
      },
      h2: {
        
        fontSize: '3rem', [`@media screen and (max-width: 1200px)`]: {
          fontSize: "2.5rem"
        }, [`@media screen and (max-width: 992px)`]: {
          fontSize: "2.5rem"
        }, [`@media screen and (max-width: 768px)`]: {
          fontSize: "2rem"
        }, [`@media screen and (max-width: 600px)`]: {
          fontSize: "1.5rem"
        }, [`@media screen and (max-width: 375px)`]: {
          fontSize: "1.25rem"
        },
        fontWeight: 600
      },
      h3: {
        
        fontSize: '2.4rem', [`@media screen and (max-width: 1440px)`]: {
          fontSize: "2.2rem"
        }, [`@media screen and (max-width: 1280px)`]: {
          fontSize: "1.9rem"
        }, [`@media screen and (max-width: 1024px)`]: {
          fontSize: "1.8rem"
        }, [`@media screen and (max-width: 768px)`]: {
          fontSize: "1.5rem"
        }, [`@media screen and (max-width: 600px)`]: {
          fontSize: "1.25rem"
        }, [`@media screen and (max-width: 375px)`]: {
          fontSize: "1.05rem"
        },
        fontWeight: 600
      },
      h4: {
        
        fontSize: '2rem', [`@media screen and (max-width: 1200px)`]: {
          fontSize: "2rem"
        }, [`@media screen and (max-width: 992px)`]: {
          fontSize: "1.75rem"
        }, [`@media screen and (max-width: 768px)`]: {
          fontSize: "1.55rem"
        }, [`@media screen and (max-width: 600px)`]: {
          fontSize: "1.25rem"
        }, [`@media screen and (max-width: 375px)`]: {
          fontSize: "1.15rem"
        },
        fontWeight: 500
      },
      h5: {
        
        fontSize: '1.5rem', [`@media screen and (max-width: 1200px)`]: {
          fontSize: "1.35rem"
        }, [`@media screen and (max-width: 992px)`]: {
          fontSize: "1.3rem"
        }, [`@media screen and (max-width: 768px)`]: {
          fontSize: "1.25rem"
        }, [`@media screen and (max-width: 600px)`]: {
          fontSize: "1.25rem"
        }, [`@media screen and (max-width: 375px)`]: {
          fontSize: "1.15rem"
        },
        fontWeight: 400
      },
      h6: {
        
        fontWeight: 400
        , fontSize: '1.30rem', [`@media screen and (max-width: 1200px)`]: {
          fontSize: "1.0rem"
        }, [`@media screen and (max-width: 992px)`]: {
          fontSize: "1.0rem"
        }, [`@media screen and (max-width: 768px)`]: {
          fontSize: "1.0rem"
        }, [`@media screen and (max-width: 600px)`]: {
          fontSize: "1rem"
        }, [`@media screen and (max-width: 375px)`]: {
          fontSize: "0.8rem"
        },
      },
      button: {
        
      }
    }
  })
  return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}

export default MyApp
