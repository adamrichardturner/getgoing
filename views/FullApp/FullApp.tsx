import HeaderComponent from '@/components/Header/HeaderComponent'
import TasksView from '../TasksView/TasksView'

interface FullAppProps {
  isSupabaseConnected: any
  user: any
  signOut: any
}

const FullApp = ({ isSupabaseConnected, user, signOut }: FullAppProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <HeaderComponent
        isSupabaseConnected={isSupabaseConnected}
        user={user}
        signOut={signOut}
      />
      <TasksView user={user} />
    </div>
  )
}

export default FullApp
