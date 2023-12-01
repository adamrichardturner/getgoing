import Layout from '@/layout/Layout'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import TasksView from '@/components/TasksView/TasksView'

import { User } from '@/types/User'
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
  return (
    <div className="bg-layout h-screen flex-1 w-full flex flex-col items-center">
      <Layout
        user={user as User}
        isSupabaseConnected={isSupabaseConnected}
        signOut={signOut}
      />
      <TasksView />
    </div>
  )
}
