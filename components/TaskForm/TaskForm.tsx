'use client'

import { format } from 'date-fns'
import { SetStateAction, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowsSpin } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FormMessage } from '../ui/form'
import { toast } from '@/components/ui/use-toast'
import { CategoryDropdown } from './CategoryDropdown/CategoryDropdown'
import { DatePicker } from './DatePicker/DatePicker'
import { ColorPicker } from './ColorPicker/ColorPicker'
import useTodos from '@/hooks/todos'
import { PreFormTodo } from '@/types/Todo'
import { Category } from '@/types/Category'
import useCategories from '@/hooks/categories'

const TaskForm = () => {
  const { categories } = useCategories()
  const { handleAddTodo } = useTodos()
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Tasks')
  const [selectedColor, setSelectedColor] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [formattedDate, setFormattedDate] = useState<string>('')

  function getIdFromName(name: string, array: Category[]): number | null {
    const category = array.find((obj) => obj.name === name)
    return category ? category.id : null
  }

  const categoryId = getIdFromName(selectedCategory, categories)

  const formSchema = z.object({
    content: z
      .string()
      .min(2, 'Task must be at least 2 characters.')
      .max(280, 'Task must be less than 280 characters.')
  })

  const {
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ''
    }
  })

  const onReset = () => {
    reset()
    setContent('')
    setSelectedCategory('All Tasks')
    setSelectedColor('')
    setDate(null)
  }

  const onSubmit = () => {
    if (content.length < 2 || content.length > 280) {
      // Optionally, show an error message to the user
      toast({
        title: 'Validation error',
        description: 'Content must be between 2 and 280 characters.'
      })
      return
    }

    // Create a Todo object based on the Todo type
    const newTodo: PreFormTodo = {
      content: content,
      category_id: categoryId || null,
      color: selectedColor || 'default-color',
      due_date: date || null,
      completed: false
    }

    const createNewTodo = async (todo: PreFormTodo) => {
      await handleAddTodo(todo)
    }

    // Call the createTodo function with the newTodo object
    createNewTodo(newTodo)
    toast({
      title: 'Task added successfully',
      description: content
    })

    // Reset the form and local state
    reset()
    setContent('')
    setSelectedCategory('All Tasks')
    setSelectedColor('')
    setDate(null)
  }

  // Function to handle date selection
  const handleDateSelect = (newDate: Date | null) => {
    setDate(newDate) // Set the actual Date object

    // Format and set the display date
    if (newDate) {
      const formatted = format(newDate, 'PPP') // 'PPP' for formatted date like Jan 1, 2020
      setFormattedDate(formatted)
    } else {
      setFormattedDate('') // Reset if no date is selected
    }
  }

  return (
    <article className="bg-task hover:bg-darktask w-full flex flex-col justify-between shadow hover:shadow cursor-pointer rounded-lg py-6 px-3 mt-0">
      <div className="flex flex-row items-center justify-between lg:justify-start space-x-2 w-full placeholder-highlight">
        <Input
          placeholder="Add a task"
          {...register('content')}
          value={content}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setContent(e.target.value)
          }
          className="w-full shadow hover:shadow-lg focus:outline focus:outline-iconColor focus-visible:border-1 focus-visible:ring-1 focus-visible:border-bodyText focus-visible:ring-bodyText"
        />
      </div>
      <div className="flex flex-col items-start justify-start sm:justify-between lg:justify-start">
        <div className="w-full flex flex-row justify-start items-start sm:justify-between lg:justify-start lg:space-x-3">
          <div className="sm:w-full flex flex-row space-x-3 pt-3 w-full">
            <CategoryDropdown
              onSelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            <ColorPicker
              onSelect={setSelectedColor}
              selectedColor={selectedColor}
            />
            <DatePicker
              onSelect={handleDateSelect}
              date={date}
              formattedDate={formattedDate}
            />
            <div className="ml-auto grow w-full sm:flex-none sm:w-auto dark:text-white">
              <Button
                type="submit"
                className="z-1 w-full ml-auto bg-btn text-white dark:text-white shadow hover:shadow-lg"
                onClick={onSubmit}
                disabled={content.length < 2}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-white dark:text-white pr-1"
                />
                Add
              </Button>
            </div>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center mt-2.5 space-x-1"
        >
          <FontAwesomeIcon
            icon={faArrowsSpin}
            className="text-btnOutline dark:text-white"
          />
          <span className="text-xxs text-btnOutline dark:text-white">
            Reset
          </span>
        </button>
      </div>
      {errors.content && <FormMessage>{errors.content.message}</FormMessage>}
    </article>
  )
}

export default TaskForm
