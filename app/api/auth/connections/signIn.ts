import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}
