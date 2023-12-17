import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'
import StoreProvider from './StoreProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { SpeedInsights } from '@vercel/speed-insights/next'

const defaultUrl = process.env.VERCEL_URL
  ? `https://getgoing.adamrichardturner.dev`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'GetGoing App | To Do and Task Management',
  description:
    'GetGoing revolutionizes the way you manage your tasks with custom categories, colour coding and deadlines.',
  openGraph: {
    title: 'GetGoing App | To Do and Task Management',
    description:
      'GetGoing revolutionizes the way you manage your tasks with custom categories, colour coding and deadlines.',
    images: 'https://getgoing.adamrichardturner.dev/opengraph-image.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className='bg-main text-foreground'
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
            <SpeedInsights />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
