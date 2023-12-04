'use client'
import { useEffect, useState } from 'react'
import TaskForm from '../TaskForm/TaskForm'
import Task from '../Task/Task'
import useMyTheme from '@/hooks/theme/index'
import useTodos from '@/hooks/todos'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
import { useTheme } from 'next-themes'
import { useAppSelector } from '@/lib/hooks'
import useCategories from '@/hooks/categories'

const TaskView = () => {
  const { loadTodos, filterByCategory } = useTodos()
  const { selectedCategory } = useCategories()
  const [isLoading, setIsLoading] = useState(true)
  const { changeSmallScreen, smallScreen } = useMyTheme()
  const { theme } = useTheme()

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768
      changeSmallScreen(isSmall)
    }

    // Set up the event listener
    window.addEventListener('resize', handleResize)

    // Check the screen size on mount
    handleResize()

    return () => {
      // Clean up the event listener
      window.removeEventListener('resize', handleResize)
    }
  }, [changeSmallScreen])
  const todos = useAppSelector((state) => state.todos.items)
  useEffect(() => {
    const loader = async () => {
      await loadTodos()
      setIsLoading(false)
      console.log('Todos loaded:', todos)
    }
    loader()
  }, [loadTodos])

  const isLight: boolean = theme === 'light'

  const filteredTodos =
    selectedCategory === 999 ? todos : filterByCategory(todos, selectedCategory)

  const todosList = isLoading ? (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <TasksLoadingAnimation isLightMode={isLight} />
    </div>
  ) : (
    filteredTodos.map((todo) => <Task key={todo.id} todo={todo} />)
  )

  return (
    <main
      className={`${
        smallScreen ? 'pl-mainWide' : 'pl-main'
      } px-4 pb-20 bg-main min-h-screen pt-mainTop flex flex-col w-full transition-all ease-in-out custom-scroll-container`}
    >
      <section className="space-y-4 pt-2">
        <TaskForm />
        {todosList}
      </section>
    </main>
  )
}

export default TaskView
