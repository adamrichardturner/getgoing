import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

interface ColorPickerProps {
  onSelect: (category: string) => void
}

export function ColorPicker({ onSelect }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')

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
    onSelect(color)
    setSelected(color)
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
          className="w-9 h-9 grow-0 border border-itemBorder flex-none shadow hover:shadow-lg"
        >
          <FontAwesomeIcon
            icon={faPalette}
            className={`w-4 h-4 text-btnOutline dark:text-white items-center justify-center`}
            style={{ color: selected }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="flex flex-wrap gap-1">
          {solids.map((color) => {
            return (
              <div
                key={color}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105 shadow hover:shadow-lg hover:border-primary"
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
