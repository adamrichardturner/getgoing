'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import useControl from '@/hooks/control'
import { useState } from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Filter() {
  const { changeFilter, changeColor, filterOption } = useControl()
  const [isOpen, setIsOpen] = useState(false)

  const solids = [
    '#FFC102', // Adam Yellow
    '#FF6F61', // Soft Coral Red
    '#AC58F5', // Purple Dawn
    '#00D301', // GetGoing Green
    '#A0522D', // Dusty Rose Red
    '#2464cf', //  Light Periwinkle Blue
  ]

  const handleColorPick = (color: string) => {
    changeFilter('color')
    changeColor(color)
    setIsOpen(false)
  }

  // Toggle the popover
  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  const handleChangeCompleted = (newStatus: string) => {
    if (filterOption === newStatus) {
      changeFilter('none')
    } else {
      changeFilter(newStatus)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={togglePopover} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='hover:text-primary text-btnOutline space-x-0.5'>
          <FontAwesomeIcon
            icon={faFilter}
            className='w-3 h-3 sm:w-5 sm:h-5 text-highlight'
          />
          <span className='text-xs sm:text-sm text-highlight'>Filter</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 mr-6 space-y-1'>
        <DropdownMenuLabel className='text-xs pl-2'>
          Filter By Completion
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filterOption === 'completed'}
          onCheckedChange={() => handleChangeCompleted('completed')}
          className={`${
            filterOption === 'completed'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer`}
        >
          Show Completed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterOption === 'not_completed'}
          onCheckedChange={() => handleChangeCompleted('not_completed')}
          className={`${
            filterOption === 'not_completed'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer`}
        >
          Hide Completed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterOption === 'none'}
          onCheckedChange={() => handleChangeCompleted('none')}
          className={`${
            filterOption === 'none'
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer`}
        >
          Show All
        </DropdownMenuCheckboxItem>
        <DropdownMenuLabel className='text-xs pl-2 pb-0'>
          Filter By Color
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='flex flex-wrap gap-1 mt-0'>
          {solids.map((color) => (
            <div
              key={color}
              className='h-8 w-8 cursor-pointer rounded-md active:scale-105 shadow hover:shadow-lg hover:border-primary'
              onClick={() => handleColorPick(color)}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
