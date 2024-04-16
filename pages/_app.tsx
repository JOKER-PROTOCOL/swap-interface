import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { configResponsive } from 'ahooks'

import 'styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { client } from '../components/layout/AppLayout'

configResponsive &&
  configResponsive({
    isSM: 375,
    isXL: 1440,
  })

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || (page => page)

  // clear log in prod
  useEffect(() => {
    console.log('111 in MyApp')
    const isProd = window?.location.hostname === 'www.async.finance'
    const isDebugMode = localStorage.getItem('isDebugMode')

    if (isProd && isDebugMode !== 'true') {
      window.console.log = () => {}
      console.clear()
    }
  }, [])

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
