import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { useState } from 'react'
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
import { PreFormTodo } from '@/types/Todo'
import useCategories from '@/hooks/categories'
import { useTheme } from 'next-themes'

const TaskForm = () => {
  const { selectedCategory } = useCategories()
  const { handleAddTodo } = useTodos()
  const [content, setContent] = useState('')
  const [selectedCategoryName, setSelectedCategoryName] = useState('All Tasks')
  const [selectedColor, setSelectedColor] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [formattedDate, setFormattedDate] = useState<string>('')
  const [catExpanded, setCatExpanded] = useState<boolean>(false)
  const [calendarExpanded, setCalendarExpanded] = useState<boolean>(false)
  const [isTaskbarBottomVisible, setIsTaskbarBottomVisible] = useState(false)

  const { theme } = useTheme()

  const controls = useAnimation()

  const formSchema = z.object({
    content: z
      .string()
      .min(2, 'Task must be at least 2 characters.')
      .max(280, 'Task must be less than 280 characters.'),
  })

  const {
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const resetTaskFormState = () => {
    setContent('')
    setSelectedColor('')
    setDate(null)
    setFormattedDate('')
    setCatExpanded(false)
    setCalendarExpanded(false)
  }

  const toggleTaskbarBottom = () => {
    setIsTaskbarBottomVisible(true)
  }

  const onSubmit = async () => {
    if (content.length < 2 || content.length > 280) {
      toast({
        title: 'Validation error',
        description: 'Content must be between 2 and 280 characters.',
      })
      return
    }

    const newTodo: PreFormTodo = {
      content: content,
      category_id: selectedCategory === 999 ? null : selectedCategory,
      color: selectedColor || 'default-color',
      due_date: date || null,
      completed: false,
    }

    try {
      const data: string | undefined = await handleAddTodo(newTodo)

      if (data === undefined) {
        toast({
          title: data,
          description: content,
        })
      }
    } catch (error: any) {
      toast({
        title: 'Error adding task',
        description: error,
      })
    }

    setIsTaskbarBottomVisible(false)

    resetTaskFormState()
    reset()
  }

  const handleDateSelect = (newDate: Date | null) => {
    setDate(newDate)

    if (newDate) {
      const formatted = format(newDate, 'PPP')
      setFormattedDate(formatted)
    } else {
      setFormattedDate('')
    }
  }

  return (
    <motion.article
      className='sticky top-50 z-1 bg-taskbar w-full flex flex-col justify-between cursor-pointer rounded-t-lg mt-0'
      animate={controls}
      initial={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        onClick={toggleTaskbarBottom}
        className='taskbar-top bg-inputBar flex flex-row items-center justify-between lg:justify-start rounded-t-lg space-x-2 w-full'
      >
        <button
          className='bg-inputBar cursor-pointer relative left-6 text-default-color'
          disabled={content.length < 2}
          onClick={onSubmit}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <Input
          placeholder='Add a Task'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type='text'
          style={{ border: 'none' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit()
          }}
          className='pl-10 bg-inputBar text-bodyText dark:placeholder-high-contrast dark:focus:placeholder-high-contrast placeholder-default-color focus:placeholder-default-color w-full cursor-pointer py-6 focus:outline-none focus-visible:ring-0 focus:border-none border-none ring-none focus:ring-0'
        />
      </div>
      <AnimatePresence>
        {isTaskbarBottomVisible && (
          <motion.div
            className='taskbar-bottom bg-taskbar shadow py-2 flex flex-col items-start justify-start sm:justify-between lg:justify-start'
            initial={{ y: -45, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -45, opacity: 0 }}
            transition={{ type: 'tween', ease: 'backInOut', duration: 0.25 }}
          >
            <div className='w-full flex flex-row justify-start items-start sm:justify-between lg:justify-start lg:space-x-2'>
              <div className='sm:w-full flex flex-row space-x-2 pl-3.5 w-full justify-between md:justify-start'>
                <div className='flex flex-row space-x-2'>
                  <CategoryDropdown
                    onSelect={setSelectedCategoryName}
                    catExpanded={catExpanded}
                    onExpand={setCatExpanded}
                  />
                  <ColorPicker
                    onSelect={setSelectedColor}
                    selectedColor={selectedColor}
                  />
                  <DatePicker
                    calendarExpanded={calendarExpanded}
                    onExpand={setCalendarExpanded}
                    onSelect={handleDateSelect}
                    date={date ? date : ''}
                    formattedDate={formattedDate}
                  />
                </div>

                <div className='ml-auto grow w-full xs:flex-none xs:w-auto text-btnText pr-2'>
                  <Button
                    type='submit'
                    className='z-1 h-8 px-3 mr-2 w-full ml-auto bg-btn ring-1 ring-btnOutline hover:shadow-lg hover:bg-darktask'
                    style={{
                      color:
                        content && theme === 'dark'
                          ? 'var(--high-contrast)'
                          : 'var(--default-color)',
                    }}
                    onClick={onSubmit}
                    disabled={content.length < 2}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {errors.content && <FormMessage>{errors.content.message}</FormMessage>}
    </motion.article>
  )
}

export default TaskForm
