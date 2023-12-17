import React, { useState } from 'react'
import { AppProps } from 'next/app'
import StoreProvider from '../app/StoreProvider'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  return (
    <StoreProvider>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </StoreProvider>
  )
}

export default MyApp
