import * as React from 'react'
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
  onSelect: (date: string) => void
}

export function DatePicker({ onSelect }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | null>(null)

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      onSelect(format(newDate, 'yyyy-MM-dd')) // Format date as YYYY-MM-DD
      setDate(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-9 h-9 sm:w-auto sm:text-left justify-center font-normal border border-itemBorder shadow hover:shadow-lg xs:text-xs',
            !date && 'text-btnOutline'
          )}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className="w-4 h-4 text-btnOutline items-center justify-center sm:pr-2"
          />
          {date ? (
            <span className="hidden sm:block">{format(date, 'PPP')}</span> // Display formatted date
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
