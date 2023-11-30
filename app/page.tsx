import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Header from '@/components/Header/Header'
import { poppins } from './fonts'

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Header />
      <div
        className={`${poppins.className} animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3`}
      >
        <main className="flex-1 flex flex-col gap-6"></main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Adam Turner
          </a>
        </p>
      </footer>
    </div>
  )
}
