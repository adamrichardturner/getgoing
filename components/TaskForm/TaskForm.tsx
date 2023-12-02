'use client'

import { SetStateAction, useState } from 'react'
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
import { NewToDo, Todo } from '@/types/Todo'

const TaskForm = () => {
  const { handleAddTodo } = useTodos()
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

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
    const newTodo: NewToDo = {
      content: content,
      category: selectedCategory || 'All Todos',
      color: selectedColor || 'default-color',
      due_date: selectedDate || null,
      completed: false
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
        <FontAwesomeIcon
          icon={faPlus}
          className="text-slate-900 dark:text-white"
        />
        <Input
          placeholder="Add a task"
          {...register('content')}
          value={content}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setContent(e.target.value)
          }
          className="w-full border-primary dark:border-white"
        />
      </div>
      <div className="flex flex-col md:flex-row items-start justify-start md:justify-between lg:justify-start lg:space-x-3">
        <div className="flex flex-col md:flex-row justify-start items-start md:justify-between lg:justify-start lg:space-x-3">
          <div className="md:w-content flex flex-row space-x-3 pt-3">
            <CategoryDropdown onSelect={setSelectedCategory} />
            <ColorPicker onSelect={setSelectedColor} />
          </div>
          <div className="flex flex-row space-x-3 px-3 pt-3 w-full md:w-auto justify-start">
            <DatePicker onSelect={setSelectedDate} />
            <Button type="submit" className="w-full" onClick={onSubmit}>
              Add
            </Button>
          </div>
          {/* <div className="w-1/2 pt-3 md:w-auto space-x-3"></div> */}
        </div>
      </div>
      {errors.content && <FormMessage>{errors.content.message}</FormMessage>}
    </article>
  )
}

export default TaskForm
