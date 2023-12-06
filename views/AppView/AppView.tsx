'use client'

import Layout from '@/layout/Layout'
import TasksView from '../TasksView/TasksView'
import { User } from '@/types/User'

interface AppViewProps {
  user: User
  isSupabaseConnected: boolean
  signOut: () => Promise<never>
}

const AppView = ({ user, isSupabaseConnected, signOut }: AppViewProps) => {
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

export default AppView
