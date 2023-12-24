'use client'

import useMyAuth from '@/hooks/auth'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '../../ui/avatar'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { User } from '@/types/User'

interface ProfileComponentProps {
  user: User | null
}

export function ProfileComponent({ user }: ProfileComponentProps) {
  const { signOut } = useMyAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (!user) {
    return <div>User not found</div>
  }

  const handleSignOut = async () => {
    await signOut()
    setIsDropdownOpen(false)
  }

  return (
    <div className='flex flex-row items-center cursor-pointer'>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='border border-white shadow-md relative h-9 w-9 rounded-lg group'
          >
            <Avatar className='h-8 w-8 flex items-center justify-center'>
              <FontAwesomeIcon
                icon={faUser}
                className='w-4 text-white group-hover:text-white dark:group-hover:text-accent-foreground dark:hover:text-accent-foreground'
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 z-50' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>Welcome</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
