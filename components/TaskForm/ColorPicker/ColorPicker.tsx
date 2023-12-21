import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

interface ColorPickerProps {
  onSelect: (category: string) => void
  selectedColor: string
}

export function ColorPicker({ onSelect, selectedColor }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const solids = [
    '#FFC102', // Adam Yellow
    '#FF6F61', // Soft Coral Red
    '#FFDAB9', // Light Apricot Orange
    '#98FB98', // Pale Mint Green
    '#A0522D', // Dusty Rose Red
    '#2464cf', //  Light Periwinkle Blue
  ]

  const handleColorPick = (color: string) => {
    onSelect(color)
    setIsOpen(false)
  }

  // Toggle the popover
  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Popover open={isOpen} onOpenChange={togglePopover}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className='w-9 h-9 bg-inputBar grow-0 border border-itemBorder flex-none shadow hover:shadow-lg hover:bg-itemHover'
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <FontAwesomeIcon
            icon={faPalette}
            className={`w-4 h-4 text-btnOutline dark:text-white items-center justify-center ${
              isHovering ? 'text-primary dark:text-white' : ''
            }`}
            style={{ color: selectedColor }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-4'>
        <div className='flex flex-wrap gap-1'>
          {solids.map((color) => {
            return (
              <div
                key={color}
                className='h-6 w-6 cursor-pointer rounded-md active:scale-105 shadow hover:shadow-lg hover:border-primary'
                onClick={() => handleColorPick(color)}
                style={{ backgroundColor: color }}
              />
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
