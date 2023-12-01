import { SearchComponent } from './SearchComponent/SearchComponent'
import { SearchDialog } from './SearchComponent/SearchDialog'
import { ProfileComponent } from './ProfileComponent/ProfileComponent'
import { DarkModeToggle } from './DarkModeToggle/DarkModeToggle'
import { LeagueSpartan } from '@/app/fonts'
import { User } from '@/types/User'
import Link from 'next/link'

// Define the props interface
interface HeaderComponentProps {
  user: User | null
  isSupabaseConnected: boolean | null
  signOut: () => Promise<never>
}

export default async function HeaderComponent({
  user,
  isSupabaseConnected,
  signOut
}: HeaderComponentProps) {
  return (
    <header className="z-10 bg-layout fixed top-0 border-b border-b-foreground/10 flex flex-col items-center justify-between w-full">
      <nav className="w-full flex justify-between  h-16">
        <div className="w-full flex justify-between items-center p-3 text-sm">
          <div className="flex flex-row items-center space-x-3">
            <Link
              href="/"
              className="py-2 px-0 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              <h1
                className={`${LeagueSpartan.className} text-xl font-semibold`}
              >
                GetGoing
              </h1>
            </Link>
            <div className="md:hidden">
              <SearchDialog />
            </div>
          </div>

          <SearchComponent />
          {isSupabaseConnected && user && (
            <div className="flex flex-row space-x-4">
              <ProfileComponent user={user as User} signOut={signOut} />
              <DarkModeToggle />
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
