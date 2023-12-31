'use client'
import { IoFilter } from 'react-icons/io5'
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

export function Filter() {
  const { changeFilter, changeColor, filterOption, selectedColor } =
    useControl()
  const [isOpen, setIsOpen] = useState(false)

  const solids = [
    '#FFC102', // Adam Yellow
    '#FF6F61', // Soft Coral Red
    '#AC58F5', // Purple Dawn
    '#00D301', // GetGoing Green
    '#A0522D', // Dusty Rose Red
    '#0f172a', //  Dark Blue
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
      changeFilter('')
    } else {
      changeFilter(newStatus)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={togglePopover} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='hover:text-primary text-btnOutline space-x-1 flex flex-row items-center text-md'>
          <IoFilter />
          <span className='text-md text-highlight'>Filter</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 mr-6 space-y-1'>
        <DropdownMenuLabel className='text-sm pl-2 font-regular'>
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
          checked={filterOption === ''}
          onCheckedChange={() => handleChangeCompleted('')}
          className={`${
            filterOption === ''
              ? 'bg-itemHover hover:bg-itemHover'
              : 'hover:bg-itemHover'
          } cursor-pointer`}
        >
          Show All
        </DropdownMenuCheckboxItem>
        <DropdownMenuLabel className='text-sm pl-2 pb-0 font-regular'>
          Filter By Color
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='flex flex-wrap gap-1 mt-0 py-2 px-2'>
          {solids.map((color) => (
            <div
              key={color}
              className={`${
                selectedColor === color ? 'border-2 border-high-contrast' : ''
              } h-8 w-8 flex-1 cursor-pointer rounded-md active:scale-105 shadow hover:shadow-lg hover:border-primary`}
              onClick={() => handleColorPick(color)}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
