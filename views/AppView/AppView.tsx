import TasksView from '../TasksView/TasksView'
import { User } from '@/types/User'
import HeaderComponent from '@/components/Header/HeaderComponent'

interface AppViewComponentProps {
  user: User | null
  isSupabaseConnected: boolean | null
}

export default async function AppView({
  user,
  isSupabaseConnected,
}: AppViewComponentProps) {
  return (
    <div className='flex min-h-screen'>
      <HeaderComponent
        user={user as User}
        isSupabaseConnected={isSupabaseConnected}
      />
      <TasksView user={user as User} />
    </div>
  )
}
