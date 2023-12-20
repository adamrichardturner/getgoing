import { useState } from 'react'
import { addDays } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDateToUK } from '@/utils/formatDate'

interface DatePickerProps {
  onSelect: (newDate: Date | null) => void
  date: Date | string
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

  let selectedDate = typeof date === 'string' ? new Date(date) : date

  const defaultMonth = new Date()

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full bg-inputBar sm:text-left justify-start font-normal border border-itemBorder shadow hover:shadow-lg hover:bg-itemHover text-foreground',
            !date && 'light:text-foreground text-bodyText hover:text-foreground'
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className={
              date || isHovering
                ? `w-4 h-4 text-foreground dark:text-white items-center justify-start pr-2`
                : `w-4 h-4 dark:text-white items-center justify-start pr-2`
            }
          />
          {date && formattedDate ? (
            <span className='text-foreground text-sm'>
              {formatDateToUK(selectedDate)}
            </span>
          ) : (
            <span className='text-foreground text-sm'>Pick a Due Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex w-auto flex-col space-y-2 p-2'>
        <Select
          onValueChange={(value) =>
            handleDateChange(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <Calendar
          defaultMonth={defaultMonth}
          fromMonth={defaultMonth}
          mode='single'
          selected={selectedDate}
          onSelect={handleDateChange}
          modifiersClassNames={{
            selected: 'bg-background border border-1',
            today: 'bg-background',
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
