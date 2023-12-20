'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import useTodos from '@/hooks/todos'

export function SearchPopover() {
  const { updateSearchTerm } = useTodos()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-9 px-0 border shadow-md border-white bg-transparent hover:bg-accent hover:text-accent-foreground'
        >
          <FontAwesomeIcon
            icon={faSearch}
            className='w-4 px-0 group-hover:text-high-contrast'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <h3>Search Tasks</h3>
        <Input
          id='searchPopver'
          onChange={(e) => updateSearchTerm(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  )
}
