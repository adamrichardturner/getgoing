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
  calendarExpanded: boolean
  onExpand: any
}

export function DatePicker({
  onSelect,
  date,
  formattedDate,
  calendarExpanded,
  onExpand,
}: DatePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      onSelect(newDate)
      setCalendarOpen((prev) => !prev)
      onExpand(true)
    }
  }

  let selectedDate = typeof date === 'string' ? new Date(date) : date

  const defaultMonth = new Date()

  return (
    <Popover modal open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            `${
              calendarExpanded ? 'w-8 h-8 sm:w-auto' : 'w-8 h-8'
            } bg-taskbar shadow-none sm:text-left justify-center font-normal hover:shadow-lg hover:bg-inputBar border-none outline-none hover:ring-1 hover:ring-itemBorder xs:text-xs`,
            date &&
              'bg-inputBar border border-1 border-itemBorder ring-1 ring-itemBorder px-2'
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className={`
              ${
                date || isHovering
                  ? 'w-4 h-4 text-primary items-center justify-center'
                  : 'w-4 h-4 items-center justify-center text-btnOutline dark:text-high-contrast'
              }`}
          />
          <div className={`${calendarExpanded ? 'hidden sm:block' : 'hidden'}`}>
            {date && formattedDate ? (
              <span className='text-high-contrast pl-1 sm:text-xs'>
                {formatDateToUK(selectedDate)}
              </span>
            ) : (
              <span className='hidden hover:dark:text-white sm:block sm:text-xs'>
                Pick a Due Date
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex w-auto flex-col p-3 mx-4'>
        <h3 className='text-left text-sm text-high-contrast font-regular mt-0 px-0 p-0'>
          Due Date
        </h3>
        <Calendar
          defaultMonth={defaultMonth}
          fromMonth={defaultMonth}
          mode='single'
          selected={selectedDate}
          onSelect={handleDateChange}
          modifiersClassNames={{
            selected:
              'bg-cal-selected hover:bg-cal-selected hover:text-reverse-contrast text-reverse-contrast border border-1',
            today:
              'bg-cal-today dark:bg-cal-today dark:text-high-contrast border border-1',
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
