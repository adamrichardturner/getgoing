'use client'

import { useEffect } from 'react'
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

// Define the props interface
interface ProfileComponentProps {
  user: User | null
  signOut: () => Promise<never>
}

export function ProfileComponent({ user, signOut }: ProfileComponentProps) {
  // Handle the case when user is null
  if (!user) {
    return <div>User not found</div>
  }

  const handleSignOut = () => {
    signOut()
  }

  useEffect(() => {}, [])

  return (
    <div className="flex flex-row items-center space-x-2">
      <p className="hidden md:text-xs">My Profile</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border border-white shadow-md relative h-9 w-9 rounded-lg"
          >
            <Avatar className="h-8 w-8 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-primary dark:text-white w-4 items-center justify-center"
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Welcome</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
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
