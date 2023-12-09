import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LeagueSpartan } from '../fonts'

export default function Login({
  searchParams
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`
      }
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-full min-h-screen px-8 sm:max-w-xl items-center justify-center gap-2">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-3"
          action={signIn}
        >
          <div>
            <h1
              className={`${LeagueSpartan.className} text-3xl md:text-5xl font-semibold text-center`}
            >
              GetGoing
            </h1>
            <p className="text-xs md:text-sm text-center">
              GetGoing revolutionizes the way you manage your tasks by offering
              a vibrant, category-based task management system.
            </p>
          </div>
          <div>
            <div className="flex flex-col">
              <label className="text-xs md:text-sm" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border outline-primary mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs md:text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border outline-primary mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <button className="bg-slate-200 dark:bg-slate-900 text-black dark:text-white outline-1 outline-black border rounded-md px-4 py-2 mb-2">
              Sign In
            </button>
            <button
              formAction={signUp}
              className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            >
              Sign Up
            </button>
          </div>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
