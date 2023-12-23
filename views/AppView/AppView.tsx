import TasksView from '../TasksView/TasksView'
import { User } from '@/types/User'
import HeaderComponent from '@/components/Header/HeaderComponent'

interface AppViewComponentProps {
  user: User | null
}

export default async function AppView({ user }: AppViewComponentProps) {
  return (
    <div className='flex min-h-screen'>
      <HeaderComponent user={user as User} />
      <TasksView user={user as User} />
    </div>
  )
}
