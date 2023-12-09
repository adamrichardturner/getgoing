'use client'

import DisableBodyScroll from '@/components/DisableBodyScroll'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '../../ui/avatar'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu'
import { User } from '@/types/User'
import useBodyScrollLock from '@/hooks/body'

interface ProfileComponentProps {
  user: User | null
  signOut: () => Promise<never>
}

export function ProfileComponent({ user, signOut }: ProfileComponentProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  useBodyScrollLock(isDropdownOpen) // Lock body scroll when dropdown is open

  if (!user) {
    return <div>User not found</div>
  }

  const handleSignOut = async () => {
    await signOut()
    setIsDropdownOpen(false) // Close dropdown on sign out
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen) // Toggle dropdown open/close
  }

  useEffect(() => {
    if (isDropdownOpen) useBodyScrollLock(isDropdownOpen)
  }, [isDropdownOpen])

  return (
    <div className="flex flex-row items-center space-x-2">
      <DisableBodyScroll />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild onClick={toggleDropdown}>
          <p className="hidden md:block text-xs text-white cursor-pointer">
            My Profile
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border border-white shadow-md relative h-9 w-9 rounded-lg group"
          >
            <Avatar className="h-8 w-8 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="w-4 text-white group-hover:text-white dark:group-hover:text-black"
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 z-50"
          align="end"
          forceMount
          onChange={setIsDropdownOpen}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Welcome</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
