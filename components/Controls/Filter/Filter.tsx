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
import { ColorPicker } from '@/components/TaskForm/ColorPicker/ColorPicker'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function Filter() {
  const { changeFilter } = useControl()
  const [filterCompleted, setFilterCompleted] = useState<Checked>(false)
  const [filterColor, setFilterColor] = useState<Checked>(false)
  const [selectedColor, setSelectedColor] = useState('default-color')
  const [isOpen, setIsOpen] = useState(false)

  const handleChangeFilter = (newFilter: string) => {
    if (newFilter === 'completed') setFilterCompleted(true)
    if (newFilter === 'color') setFilterColor(true)
    changeFilter(newFilter)
  }

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
    setSelectedColor(color)
    setIsOpen(false)
  }

  // Toggle the popover
  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={togglePopover}>
      <DropdownMenuTrigger asChild>
        <button className="hover:text-primary text-btnOutline">
          <FontAwesomeIcon
            icon={faFilter}
            className="w-5 h-5 hover:text-primary"
          />
          <span className="text-sm hover:text-primary">Filter</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter By Completion</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filterCompleted}
          onCheckedChange={() => handleChangeFilter('completed')}
        >
          {!filterCompleted ? 'Show Completed' : 'Hide Completed'}
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
