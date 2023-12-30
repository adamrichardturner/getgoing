'use client'
import { TbArrowsSort } from 'react-icons/tb'
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
      setCurrentSort('')
      changeSort('')
    } else {
      setCurrentSort(newSort)
      changeSort(newSort)
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='hover:text-primary text-btnOutline space-x-1 flex flex-row items-center'>
          <TbArrowsSort />
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
          checked={currentSort === 'updatedDate'}
          onCheckedChange={() => handleChangeSort('updatedDate')}
          className={`${
            currentSort === 'updatedDate'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer transition-none`}
        >
          Last Updated
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={currentSort === ''}
          onCheckedChange={() => handleChangeSort('')}
          className={`${
            currentSort === ''
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer hover:bg-itemHover transition-none`}
        >
          Show All
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
