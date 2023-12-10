import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface DatePickerProps {
  onSelect: (newDate: Date | null) => void
  date: Date | null
  formattedDate: string
}

export function DatePicker({ onSelect, date, formattedDate }: DatePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      onSelect(newDate)
      setCalendarOpen((prev) => !prev)
    }
  }

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-9 h-9 sm:w-[200px] bg-inputBar sm:text-left justify-center font-normal border border-itemBorder shadow hover:shadow-lg xs:text-xs hover:bg-itemHover',
            !date && 'text-btnOutline dark:text-white hover:text-primary'
          )}
          onMouseEnter={() => setIsHovering(true)} // Set hover state to true
          onMouseLeave={() => setIsHovering(false)} // Set hover state to false
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className={
              date || isHovering // Apply text-primary when there's a date or when hovering
                ? `w-4 h-4 text-primary dark:text-white items-center justify-center sm:pr-2`
                : `w-4 h-4 dark:text-white items-center justify-center sm:pr-2`
            }
          />
          {date ? (
            <span className="hidden sm:block sm:text-xs">{formattedDate}</span> // Display formatted date
          ) : (
            <span className="hidden sm:block sm:text-xs">Pick a Due Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            handleDateChange(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={handleDateChange}
        />
      </PopoverContent>
    </Popover>
  )
}
