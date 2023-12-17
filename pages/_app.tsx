import { FC } from 'react'
import { AppProps } from 'next/app'
import StoreProvider from '../app/StoreProvider'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
