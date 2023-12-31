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
    '#AC58F5', // Purple Dawn
    '#00D301', // GetGoing Green
    '#A0522D', // Dusty Rose Red
    '#2464CF', // Light Blue
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
    <Popover modal open={isOpen} onOpenChange={togglePopover}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={`${
            selectedColor
              ? 'bg-inputBar border border-1 ring-1 ring-itemBorder border-itemBorder hover:shadow-lg'
              : 'bg-taskbar border-none outline-none shadow-none hover:ring-1 hover:ring-itemBorder'
          } w-8 h-8 grow-0 py-0 flex-none hover:border hover:border-itemBorder hover:shadow-lg hover:bg-inputBar border-none`}
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
      <PopoverContent className='w-auto p-3 mx-4'>
        <h3 className='text-left text-sm text-high-contrast font-regular mt-0 p-0 pb-2'>
          Colour Picker
        </h3>
        <div className='flex flex-wrap gap-1'>
          {solids.map((color) => {
            return (
              <div
                key={color}
                className={`${
                  selectedColor === color
                    ? 'border-2 border-high-contrast '
                    : ''
                } h-6 w-6 cursor-pointer rounded-md active:scale-105 shadow hover:shadow-lg hover:border-primary`}
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
