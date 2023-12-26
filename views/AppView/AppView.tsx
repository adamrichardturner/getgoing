import TasksView from '../TasksView/TasksView'
import HeaderComponent from '@/components/Header/HeaderComponent'

export default async function AppView({ user }: any) {
  return (
    <div className='flex min-h-screen'>
      <HeaderComponent user={user} />
      <TasksView />
    </div>
  )
}
