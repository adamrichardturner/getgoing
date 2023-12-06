'use client'
import { useEffect, useState } from 'react'
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

const TasksView = () => {
  const { loadTodos, filterByCategory } = useTodos()
  const { selectedCategory } = useCategories()
  const [isLoading, setIsLoading] = useState(true)
  const { changeSmallScreen, smallScreen } = useMyTheme()
  const { theme } = useTheme()
  const {
    filterOption,
    sortOption,
    filterTodos,
    selectedColor,
    selectedCompletion
  } = useControl()

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 800
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
    }
    loader()
  }, [loadTodos])

  const isLight: boolean = theme === 'light'

  const filteredByCategoryTodos =
    selectedCategory === 999 ? todos : filterByCategory(todos, selectedCategory)

  const filteredByCompletedAndColor = filterTodos(
    filteredByCategoryTodos,
    filterOption,
    selectedColor
  )

  const todosList = isLoading ? (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <TasksLoadingAnimation isLightMode={isLight} />
    </div>
  ) : (
    filteredByCompletedAndColor?.map((todo) => (
      <Task key={todo.id} todo={todo} />
    ))
  )

  return (
    <main
      className={`${
        smallScreen ? 'pl-mainWide' : 'pl-main'
      } px-4 bg-main min-h-screen py-mainTop flex flex-col w-full transition-all ease-in-out custom-scroll-container`}
    >
      <section className="space-y-2">
        <Controls />
        <TaskForm />
        {todosList}
      </section>
    </main>
  )
}

export default TasksView
