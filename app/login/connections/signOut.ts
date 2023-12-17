import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export async function signOut() {
  const signOut = await supabase.auth.signOut()
}
