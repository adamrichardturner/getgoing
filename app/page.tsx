import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { User } from '@/types/User'
import AppView from '@/views/AppView/AppView'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isSupabaseConnected = canInitSupabaseClient()

  if (user?.aud !== 'authenticated') redirect('/login')

  return (
    <AppView user={user as User} isSupabaseConnected={isSupabaseConnected} />
  )
}
