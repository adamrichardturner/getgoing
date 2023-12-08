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
import { Todo } from '@/types/Todo'

interface TasksViewState {
  isLoading: boolean
  isLight: boolean
}

const TasksView: React.FC = () => {
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

  // Adjust the class based on the sidebar state
  const mainClass = isDrawerOpen ? 'main-open' : 'main-closed'

  return (
    <main
      className={`relative flex-1 overflow-scroll pt-mainTop z-4 ${mainClass}`}
    >
      <section className="space-y-2 overflow-auto px-4">
        <Controls />
        <TaskForm />
        {todosList}
      </section>
    </main>
  )
}

export default TasksView
