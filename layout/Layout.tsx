import Header from '@/components/Header/HeaderComponent'
import CategoriesDrawer from '@/components/CategoriesDrawer/CategoriesDrawer'
import { User } from '@/types/User'

interface LayoutComponentProps {
  user: User | null
  isSupabaseConnected: boolean | null
  signOut: () => Promise<never>
}

export default async function Layout({
  user,
  isSupabaseConnected,
  signOut
}: LayoutComponentProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <Header
        user={user as User}
        isSupabaseConnected={isSupabaseConnected}
        signOut={signOut}
      />
      <CategoriesDrawer user={user as User} />
    </div>
  )
}
