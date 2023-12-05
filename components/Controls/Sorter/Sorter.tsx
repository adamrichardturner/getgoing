'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import useControl from '@/hooks/control'
import { useState } from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function Sorter() {
  const { changeSort } = useControl()
  const [sortDueDate, setSortDueDate] = useState<Checked>(true)
  const [sortAlpha, setSortAlpha] = useState<Checked>(false)
  const [sortCreationDate, setSortCreationDate] = useState<Checked>(false)

  const handleChangeSort = (newSort: string) => {
    if (newSort === 'dueDate') setSortDueDate(true)
    if (newSort === 'alpha') setSortAlpha(true)
    if (newSort === 'creationDate') setSortCreationDate(true)
    changeSort(newSort)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:text-primary text-btnOutline">
          <FontAwesomeIcon
            icon={faSort}
            className="w-5 h-5 hover:text-primary"
          />
          <span className="text-sm hover:text-primary">Sort</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={sortDueDate}
          onCheckedChange={() => handleChangeSort('dueDate')}
        >
          Due Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortAlpha}
          onCheckedChange={() => handleChangeSort('alpha')}
          disabled
        >
          Alphabetically
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortCreationDate}
          onCheckedChange={() => handleChangeSort('creationDate')}
        >
          Creation Date
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
