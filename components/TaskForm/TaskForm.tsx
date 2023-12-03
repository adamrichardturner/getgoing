'use client'

import { SetStateAction, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FormMessage } from '../ui/form'
import { toast } from '@/components/ui/use-toast'
import { CategoryDropdown } from './CategoryDropdown/CategoryDropdown'
import { DatePicker } from './DatePicker/DatePicker'
import { ColorPicker } from './ColorPicker/ColorPicker'
import useTodos from '@/hooks/todos'
import { NewToDo } from '@/types/Todo'
import { useAppSelector } from '@/lib/hooks'
import { Category } from '@/types/Category'

const TaskForm = () => {
  const { handleAddTodo } = useTodos()
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  function getIdFromName(name: string, array: Category[]): number | null {
    const item = array.find((obj) => obj.name === name)
    return item ? item.id : null
  }

  const categories = useAppSelector((state) => state.categories.items)

  const categoryId = getIdFromName(selectedCategory, categories)

  const formSchema = z.object({
    content: z.string().min(2, 'Task must be at least 2 characters.')
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

  const onSubmit = () => {
    // Create a Todo object based on the Todo type
    const newTodo = {
      content: content,
      category_id: categoryId,
      color: selectedColor || 'default-color',
      due_date: selectedDate || null,
      completed: false,
      user_id: null
    }

    // Call the createTodo function with the newTodo object
    handleAddTodo(newTodo)

    toast({
      title: 'Task added successfully',
      description: content
    })

    // Reset the form and local state
    reset()
    setContent('')
    setSelectedCategory('')
    setSelectedColor('')
    setSelectedDate('')
  }

  return (
    <article className="bg-task hover:bg-darktask w-full flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer rounded-lg py-6 px-3">
      <div className="flex flex-row items-center justify-between lg:justify-start space-x-2 w-full">
        <Input
          placeholder="Add a task"
          {...register('content')}
          value={content}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setContent(e.target.value)
          }
          className="w-full shadow border border-itemBorder"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-start justify-start sm:justify-between lg:justify-start lg:space-x-3">
        <div className="w-full flex flex-row justify-start items-start sm:justify-between lg:justify-start lg:space-x-3">
          <div className="sm:w-full flex flex-row space-x-3 pt-3 w-full">
            <CategoryDropdown
              onSelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            <ColorPicker onSelect={setSelectedColor} />
            <DatePicker onSelect={setSelectedDate} />
            <div className="ml-auto grow w-full sm:flex-none sm:w-auto">
              <Button
                type="submit"
                className="w-full ml-auto bg-btn shadow hover:shadow-lg"
                onClick={onSubmit}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-white dark:text-black pr-1"
                />
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      {errors.content && <FormMessage>{errors.content.message}</FormMessage>}
    </article>
  )
}

export default TaskForm
