import * as React from 'react'
import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
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
            'xs:w-full md:w-[200px] justify-start text-left font-normal border-primary shadow hover:shadow-lg',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP') // Display formatted date
          ) : (
            <span className="text-xs sm:text-sm">Pick a Due Date</span>
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
