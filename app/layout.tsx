import './globals.css'
import StoreProvider from './StoreProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { SpeedInsights } from '@vercel/speed-insights/next'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'GetGoing App | To Do and Task Management',
  description: 'GetGoing revolutionizes the way you manage your tasks'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-main text-foreground"
        style={{
          backgroundColor: 'var(--main)'
        }}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
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
