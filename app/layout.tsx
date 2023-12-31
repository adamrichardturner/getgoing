import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'
import StoreProvider from './StoreProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { Viewport } from 'next'

import dynamic from 'next/dynamic'

const defaultUrl = process.env.VERCEL_URL
  ? `https://getgoingapp.io`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'GetGoing | App with Intelligent Task Management',
  description:
    'GetGoing revolutionizes the way you manage your tasks with custom categories, colour coding, deadlines and much more.',
  openGraph: {
    title: 'GetGoing | App with Intelligent Task Management',
    description:
      'GetGoing revolutionizes the way you manage your tasks with custom categories, colour coding, deadlines and much more.',
    images: 'https://getgoingapp.io/opengraph-image.png',
  },
}

export const viewport: Viewport = {
  // Resolves auto focus on inputs
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // See https://developer.chrome.com/blog/viewport-resize-behavior
  interactiveWidget: 'overlays-content',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const MobileMenuButton = dynamic(
    () => import('@/components/MobileMenuButton'),
    { ssr: false }
  )

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className='bg-main font-light text-foreground scroll-mr-[15px]'
        style={{
          backgroundColor: 'var(--main)',
        }}
      >
        <StoreProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
