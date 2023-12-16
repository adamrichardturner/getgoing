'use client'
import { format } from 'date-fns'
import { useState } from 'react'
import { formatDateToUK } from '@/utils/formatDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import useTodos from '@/hooks/todos'
import { Button } from '@/components/ui/button'
import { TitleInput } from './TitleInput'
import { Todo } from '@/types/Todo'
import ColorPicker from '../ColorPicker'
import { CategorySelect } from './CategorySelect'
import { DatePicker } from '../TaskForm/DatePicker/DatePicker'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function TaskContextMenu({ todo, id }: { todo: Todo; id: number }) {
  const { handleDeleteTodo } = useTodos()
  const [newCategory, setNewCategory] = useState<number>(
    todo.category_id ? todo.category_id : 999
  )
  const [newColor, setNewColor] = useState<string>(todo.color ? todo.color : '')
  const [dueDate, setDueDate] = useState<string | undefined>()

  const initialDueDate = todo.due_date ? new Date(todo.due_date) : ''
  const [newDueDate, setNewDueDate] = useState<Date | string>(initialDueDate)
  const [formattedDate, setFormattedDate] = useState<string>(
    formatDateToUK(todo.due_date)
  )
  const [newTitle, setNewTitle] = useState<string>('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleDelete = async (id: number) => {
    await handleDeleteTodo(id)
  }

  // Function to handle date selection
  const handleDateSelect = (newDate: Date | null) => {
    const dateValue = newDate || ''
    setNewDueDate(dateValue)

    // Format and set the display date
    setFormattedDate(newDate ? format(newDate, 'PPP') : '')
  }

  const handleNewCategory = (categoryId: number) => {
    setNewCategory(categoryId)
  }

  const handleColorSelect = (newColor: string) => {
    setNewColor(newColor)
  }

  return (
    <Dialog open={dropdownOpen} onOpenChange={setDropdownOpen} modal>
      <DialogTrigger asChild>
        <Button className='bg-transparent p-0 shadow-none outline-none border-none'>
          <FontAwesomeIcon
            icon={faEllipsis}
            className='dark:text-white text-bodyText shadow-none outline-none border-none'
          />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle className='space-y-1'>
            <span className='text-xl'>Edit Task</span>
            <span className='text-xs text-bodyText relative flex flex-col items-start'>
              Created: {formatDateToUK(todo.created_at ?? '')}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-3'>
          <div>
            <label htmlFor='colorPicker' className='text-xs'>
              Change Task Colour
            </label>
            <ColorPicker
              selectedColor={newColor}
              handleColorSelect={handleColorSelect}
            />
          </div>
          <div>
            <label htmlFor='editTask' className='text-xs'>
              Change Title
            </label>
            <TitleInput
              todo={todo}
              id={todo.id}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              setDropdownOpen={setDropdownOpen}
            />
          </div>
          <div>
            <label
              htmlFor='catDropdown'
              className='text-xs border-0 outine-0 mb-0'
            >
              Change Category
            </label>
            <CategorySelect
              handleNewCategory={handleNewCategory}
              category={todo.category || ''}
              newCategory={newCategory}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='editDueDate' className='text-xs'>
              Change Due Date
            </label>
            <DatePicker
              date={newDueDate ? newDueDate : ''}
              onSelect={handleDateSelect}
              formattedDate={formattedDate}
            />
          </div>
        </div>
        <div>
          <Button
            type='submit'
            className='bg-btn mb-2 w-full text-white mt-4'
            onClick={() => console.log('hello')}
          >
            Update
          </Button>
          <Button
            className='bg-red-500 hover:bg-red-800 w-full rounded-md cursor-pointer flex flex-row items-center justify-center text-center py-2 px-2'
            onClick={() => handleDelete(todo.id)}
          >
            <span className='text-xs text-white font-semibold'>
              Delete Task
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
