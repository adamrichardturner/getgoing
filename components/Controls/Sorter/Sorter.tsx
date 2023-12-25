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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Sorter() {
  const { changeSort } = useControl()
  const [currentSort, setCurrentSort] = useState<string>('dueDate')

  const handleChangeSort = (newSort: string) => {
    if (currentSort === newSort) {
      setCurrentSort('none')
      changeSort('none')
    } else {
      setCurrentSort(newSort)
      changeSort(newSort)
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='text-highlight space-x-1'>
          <FontAwesomeIcon
            icon={faSort}
            className='w-3 h-3 sm:w-5 sm:h-5 text-highlight'
          />
          <span className='text-xs sm:text-sm text-highlight'>Sort</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 mr-6'>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={currentSort === 'dueDate'}
          onCheckedChange={() => handleChangeSort('dueDate')}
          className={`${
            currentSort === 'dueDate'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer transition-none`}
        >
          Due Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === 'alpha'}
          onCheckedChange={() => handleChangeSort('alpha')}
          className={`${
            currentSort === 'alpha'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer transition-none`}
        >
          Alphabetically
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === 'creationDate'}
          onCheckedChange={() => handleChangeSort('creationDate')}
          className={`${
            currentSort === 'creationDate'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer transition-none`}
        >
          Creation Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === 'updated_at'}
          onCheckedChange={() => handleChangeSort('updated_at')}
          className={`${
            currentSort === 'updated_at'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer transition-none`}
        >
          Last Updated
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === 'none'}
          onCheckedChange={() => handleChangeSort('none')}
          className={`${
            currentSort === 'none'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer hover:bg-itemHover transition-none`}
        >
          No Sorting
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
