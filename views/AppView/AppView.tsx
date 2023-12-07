import TasksView from '../TasksView/TasksView'
import { User } from '@/types/User'
import CategoriesDrawer from '@/components/CategoriesDrawer/CategoriesDrawer'
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
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <HeaderComponent
        user={user as User}
        isSupabaseConnected={isSupabaseConnected}
        signOut={signOut}
      />
      <CategoriesDrawer user={user as User} />
      <TasksView />
    </div>
  )
}
