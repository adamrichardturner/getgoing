import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { User } from '@/types/User'
import AppView from '@/views/AppView/AppView'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'

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
    data: { user }
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return user ? (
    <AppView
      user={user as User}
      isSupabaseConnected={true} // Assuming connection is always successful for simplicity
      signOut={signOut}
    />
  ) : (
    redirect('/login') // You might want to replace this with a different component or redirect logic for when no user is found
  )
}
