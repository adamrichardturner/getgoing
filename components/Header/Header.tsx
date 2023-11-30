import SearchComponent from './SearchComponent/SearchComponent'
import NotificationComponent from './NotificationComponent/NotificationComponent'
import ProfileComponent from './ProfileComponent/ProfileComponent'
import DeployButton from '../../components/DeployButton'
import AuthButton from '../../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { LeagueSpartan } from '@/app/fonts'

export default function Header() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <header className="flex flex-col gap-16 items-center justify-between w-full">
      <nav className="w-full flex justify-between border-b border-b-foreground/10 h-16">
        <div className="w-full flex justify-between items-center p-3 text-sm">
          <h1 className={`${LeagueSpartan.className} text-xl`}>GetGoing</h1>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
    </header>
  )
}
