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

  const solids = [
    'palette-lightGray',
    'palette-flamingoPink',
    'palette-sunsetOrange',
    'palette-sunshineYellow',
    'palette-limeGreen',
    'palette-skyBlue',
    'palette-lavenderPurple',
    'palette-deepSeaBlue'
  ]

  const handleColorPick = (color: string) => {
    onSelect(color)
    setIsOpen(false) // Close popover on color pick
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
            className="w-4 h-4 text-btnOutline dark:text-white items-center justify-center"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="flex flex-wrap gap-1">
          {solids.map((color) => (
            <div
              key={color}
              className={`bg-${color} h-6 w-6 cursor-pointer rounded-md active:scale-105`}
              onClick={() => handleColorPick(color)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
