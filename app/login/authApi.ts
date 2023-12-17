'use server'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@/utils/supabase/server'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(email: string, password: string) {
  'use server'
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/login?message=Could not authenticate user')
  } else {
    redirect('/')
  }
}

// google signin handler
export async function signInGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    return
  }

  // Access the signed-in user's data
  const user = data.user
  console.log(user)
}

export async function signUp(email: string, password: string) {
  const origin = headers().get('origin')
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    throw new Error('Could not authenticate user')
  }

  // Perform a redirect using the new App Router syntax
  redirect('/login?message=Check email to continue sign in process')
}
