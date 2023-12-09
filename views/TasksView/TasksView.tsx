'use client'
import React, { useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import Task from '../../components/Task/Task'
import useMyTheme from '@/hooks/theme/index'
import useTodos from '@/hooks/todos'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
import { useTheme } from 'next-themes'
import { useAppSelector } from '@/lib/hooks'
import useCategories from '@/hooks/categories'
import Controls from '../../components/Controls/Controls'
import useControl from '@/hooks/control'
import { Todo } from '@/types/Todo'
import CategoriesDrawer from '@/components/CategoriesDrawer/CategoriesDrawer'
import { User } from '@/types/User'
import { motion } from 'framer-motion'

interface TasksViewState {
  isLoading: boolean
  isLight: boolean
}

interface TasksViewProps {
  user: User
}

const TasksView: React.FC<TasksViewProps> = ({ user }) => {
  const { loadTodos, filterByCategory, searchTerm } = useTodos()
  const { selectedCategory } = useCategories()
  const [isLoading, setIsLoading] = useState<TasksViewState['isLoading']>(true)
  const { changeSmallScreen, isDrawerOpen } = useMyTheme()
  const { theme } = useTheme()
  const {
    filterOption,
    filterTodos,
    selectedColor,
    sortOption,
    selectedAscending
  } = useControl()

  const mainVariants = {
    open: {
      x: isDrawerOpen ? '16rem' : '0', // Only shift if drawer is open
      transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 }
    },
    closed: {
      x: '0',
      transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 }
    }
  }

  // Sorting function
  const sortTodos = (todos: Todo[]) => {
    switch (sortOption) {
      case 'dueDate':
        return [...todos].sort((a, b) => {
          const dateA = a.due_date ? new Date(a.due_date) : new Date(0)
          const dateB = b.due_date ? new Date(b.due_date) : new Date(0)
          return dateA.getTime() - dateB.getTime()
        })
      case 'alpha':
        return [...todos].sort((a, b) => a.content.localeCompare(b.content))
      case 'creationDate':
        return [...todos].sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
          return dateA.getTime() - dateB.getTime()
        })
      default:
        return todos
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 800
      changeSmallScreen(isSmall)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [changeSmallScreen])

  const todos = useAppSelector((state) => state.todos.items)

  useEffect(() => {
    const loader = async () => {
      await loadTodos()
      setIsLoading(false)
    }
    loader()
  }, [loadTodos])

  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth)

      const handleResize = () => {
        const newWidth = window.innerWidth
        setScreenWidth(newWidth)
        changeSmallScreen(newWidth <= 800)
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [changeSmallScreen])

  // Adjust the class based on the sidebar state and screen width
  const shouldShift = isDrawerOpen && screenWidth <= 800
  // Adjust the class based on the sidebar state
  const mainClass = isDrawerOpen ? 'main-open' : 'main-closed'

  const isLight: TasksViewState['isLight'] = theme === 'light'

  const filteredByCategoryTodos =
    selectedCategory === 999
      ? todos
      : filterByCategory(todos, selectedCategory) || []

  const filteredByCompletedAndColor =
    filterTodos(filteredByCategoryTodos, filterOption, selectedColor) || []

  // New search term filter
  const filterBySearchTerm = (todos: Todo[], searchTerm: string) => {
    if (!searchTerm) return todos
    return todos.filter((todo: Todo) =>
      todo.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Apply filters and sorting
  const filteredAndSortedTodos = sortTodos(
    filterBySearchTerm(
      filterTodos(filteredByCategoryTodos, filterOption, selectedColor) || [],
      searchTerm
    )
  )

  const filteredDirectionTodos = selectedAscending
    ? [...filteredAndSortedTodos]
    : [...filteredAndSortedTodos].reverse()

  const todosList = isLoading ? (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <TasksLoadingAnimation isLightMode={isLight} />
    </div>
  ) : (
    filteredDirectionTodos?.map((todo: Todo) => (
      <Task key={todo.id} todo={todo} />
    ))
  )

  return (
    <>
      <motion.main
        className={`relative pt-mainTop z-4 ${mainClass}`}
        variants={mainVariants}
        animate={isDrawerOpen ? 'open' : 'closed'}
        initial="closed"
      >
        <section className="space-y-2 px-4">
          <Controls />
          <TaskForm />
          {todosList}
        </section>
      </motion.main>
      <CategoriesDrawer user={user as User} />
    </>
  )
}

export default TasksView
