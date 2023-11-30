import { SearchComponent } from './SearchComponent/SearchComponent'
import { SearchDialog } from './SearchComponent/SearchDialog'
import NotificationComponent from './NotificationComponent/NotificationComponent'
import { ProfileComponent } from './ProfileComponent/ProfileComponent'
import { DarkModeToggle } from './DarkModeToggle/DarkModeToggle'
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
    <header className="border-b border-b-foreground/10 flex flex-col gap-16 items-center justify-between w-full">
      <nav className="container w-full flex justify-between  h-16">
        <div className="w-full flex justify-between items-center p-3 text-sm">
          <div className="flex flex-row items-center space-x-3">
            <h1 className={`${LeagueSpartan.className} text-xl font-semibold`}>
              GetGoing
            </h1>
            <div className="md:hidden">
              <SearchDialog />
            </div>
          </div>

          <SearchComponent />
          {isSupabaseConnected && (
            <div className="flex flex-row space-x-4">
              <ProfileComponent />
              <DarkModeToggle />
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
