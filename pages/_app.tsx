import React from 'react'
import { AppProps } from 'next/app'
import StoreProvider from '../app/StoreProvider'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp