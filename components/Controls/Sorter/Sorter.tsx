'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import useControl from '@/hooks/control'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function Sorter() {
  const { changeSort } = useControl()
  const [currentSort, setCurrentSort] = useState<string>('dueDate')

  const handleChangeSort = (newSort: string) => {
    if (currentSort === newSort) {
      setCurrentSort('none') // Uncheck if the same option is clicked
      changeSort('none')
    } else {
      setCurrentSort(newSort)
      changeSort(newSort)
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="text-highlight">
          <FontAwesomeIcon icon={faSort} className="w-5 h-5 text-highlight" />
          <span className="text-sm text-highlight">Sort</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={currentSort === 'dueDate'}
          onCheckedChange={() => handleChangeSort('dueDate')}
        >
          Due Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === 'alpha'}
          onCheckedChange={() => handleChangeSort('alpha')}
        >
          Alphabetically
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === 'creationDate'}
          onCheckedChange={() => handleChangeSort('creationDate')}
        >
          Creation Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === 'none'}
          onCheckedChange={() => handleChangeSort('none')}
        >
          No Sorting
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
