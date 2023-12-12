import TasksView from '../TasksView/TasksView'
import { User } from '@/types/User'
import HeaderComponent from '@/components/Header/HeaderComponent'

interface AppViewComponentProps {
  user: User | null
  isSupabaseConnected: boolean | null
  signOut: () => Promise<never>
}

export default async function AppView({
  user,
  isSupabaseConnected,
  signOut
}: AppViewComponentProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <HeaderComponent
        user={user as User}
        isSupabaseConnected={isSupabaseConnected}
        signOut={signOut}
      />
      <TasksView user={user as User} />
    </div>
  )
}
