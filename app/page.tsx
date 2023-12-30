import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { User } from '@/types/User'
import HeaderComponent from '@/components/Header/HeaderComponent'
import TasksView from '@/views/TasksView/TasksView'
export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className='flex items-end justify-end pt-[60px] w-screen overflow-hidden'>
      <HeaderComponent user={user as User} />
      <TasksView />
    </div>
  )
}
