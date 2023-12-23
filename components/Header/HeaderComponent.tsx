import { SearchComponent } from './SearchComponent/SearchComponent'
import { ProfileComponent } from './ProfileComponent/ProfileComponent'
import { DarkModeToggle } from './DarkModeToggle/DarkModeToggle'
import { User } from '@/types/User'
import LogoComponent from './LogoComponent/LogoComponent'
import { SearchPopover } from './SearchComponent/SearchPopover'

interface HeaderComponentProps {
  user: User | null
  isSupabaseConnected: boolean | null
}

export default async function HeaderComponent({
  user,
  isSupabaseConnected,
}: HeaderComponentProps) {
  return (
    <header className='text-white z-10 h-[60px] bg-header fixed top-0 left-0 flex flex-col items-center justify-between w-full'>
      <nav className='w-full flex justify-between'>
        <div className='w-full flex justify-between items-center text-sm pl-4 pr-4 sm:pr-7 py-1.5'>
          <div className='flex flex-row items-center space-x-3'>
            <LogoComponent />
          </div>

          <SearchComponent />
          {isSupabaseConnected && user && (
            <div className='flex flex-row space-x-4'>
              <div className='md:hidden'>
                <SearchPopover />
              </div>
              <div>
                <ProfileComponent user={user as User} />
              </div>
              <div>
                <DarkModeToggle />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
