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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function Filter() {
  const { changeFilter, changeColor, filterOption } = useControl()
  const [isOpen, setIsOpen] = useState(false)

  const solids = [
    '#FF0000', // Bright Red
    '#0000FF', // Bright Blue
    '#FFFF00', // Bright Yellow
    '#008000', // Standard Green
    '#800000', // Maroon (shade of red)
    '#000080', // Navy (shade of blue)
    '#FFA500', // Orange (shade of yellow)
    '#00FF00' // Lime Green (bright shade of green)
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
    if (newStatus === 'completed') changeFilter('completed')
    else if (newStatus === 'not_completed') changeFilter('not_completed')
    else if (newStatus === 'none') changeFilter('completed')
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={togglePopover}>
      <DropdownMenuTrigger asChild>
        <button className="hover:text-primary text-btnOutline">
          <FontAwesomeIcon icon={faFilter} className="w-5 h-5 text-highlight" />
          <span className="text-sm text-highlight">Filter</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter By Completion</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filterOption === 'completed'}
          onCheckedChange={() => handleChangeCompleted('completed')}
          className="cursor-pointer"
        >
          Show Completed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterOption === 'not_completed'}
          onCheckedChange={() => handleChangeCompleted('not_completed')}
          className="cursor-pointer"
        >
          Hide Completed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterOption === 'none'}
          onCheckedChange={() => handleChangeCompleted('none')}
          className="cursor-pointer"
        >
          Show All
        </DropdownMenuCheckboxItem>
        <DropdownMenuLabel>Filter By Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-wrap gap-1">
          {solids.map((color) => {
            return (
              <div
                key={color}
                className="h-8 w-8 cursor-pointer rounded-md active:scale-105 shadow hover:shadow-lg hover:border-primary"
                onClick={() => handleColorPick(color)}
                style={{ backgroundColor: color }}
              />
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
