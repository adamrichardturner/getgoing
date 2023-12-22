'use client'

import { useEffect } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import Task from '../../components/Task/Task'
import useMyTheme from '@/hooks/theme/index'
import useTodos from '@/hooks/todos'
import { useAppSelector } from '@/lib/hooks'
import useCategories from '@/hooks/categories'
import Controls from '../../components/Controls/Controls'
import useControl from '@/hooks/control'
import { Todo } from '@/types/Todo'
import { User } from '@/types/User'
import dynamic from 'next/dynamic'

const NoSSRCategoryDrawer = dynamic(
  () => import('@/components/CategoriesDrawer/CategoriesDrawer'),
  { ssr: false }
)

interface TasksViewProps {
  user: User
}

const TasksView: React.FC<TasksViewProps> = ({ user }) => {
  const { loadTodos, filterByCategory, searchTerm } = useTodos()
  const { selectedCategory } = useCategories()
  const { changeSmallScreen, isDrawerOpen, updateDrawerOpen, isTaskbarOpen } =
    useMyTheme()
  const {
    filterOption,
    filterTodos,
    selectedColor,
    sortOption,
    selectedAscending,
  } = useControl()

  // Handle screen resize
  const handleResize = () => {
    const screenWidth = window.innerWidth
    changeSmallScreen(screenWidth < 800)

    if (screenWidth < 800) {
      updateDrawerOpen(false)
    } else if (screenWidth >= 800) {
      updateDrawerOpen(true)
    }
  }

  useEffect(() => {
    const loader = async () => {
      await loadTodos()
    }
    loader()

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize()
    }
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const todos = useAppSelector((state) => state.todos.items)

  const filteredByCategoryTodos =
    selectedCategory === 999
      ? todos
      : filterByCategory(todos, selectedCategory) || []

  // New search term filter
  const filterBySearchTerm = (todos: Todo[], searchTerm: string) => {
    if (!searchTerm) return todos
    return todos.filter((todo: Todo) =>
      todo.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredDirectionTodos = selectedAscending
    ? [
        ...sortTodos(
          filterBySearchTerm(
            filterTodos(filteredByCategoryTodos, filterOption, selectedColor) ||
              [],
            searchTerm
          )
        ),
      ]
    : [
        ...sortTodos(
          filterBySearchTerm(
            filterTodos(filteredByCategoryTodos, filterOption, selectedColor) ||
              [],
            searchTerm
          )
        ),
      ].reverse()

  const mainStyle = isDrawerOpen ? 'main-open' : 'main-closed'
  const controlStyle = isDrawerOpen ? 'control-open' : 'control-closed'

  return (
    <>
      <div className={`${controlStyle} space-y-2 relative`}>
        <div>
          <Controls />
        </div>
        <div>
          <TaskForm />
        </div>
      </div>
      <main
        className={`relative z-1 ${mainStyle} ${
          isTaskbarOpen ? 'taskbar-open' : 'taskbar-closed'
        }  `}
      >
        <section className='px-4'>
          <div className='space-y-2'>
            {filteredDirectionTodos.map((todo: Todo, i) => (
              <Task key={String(todo.id) + String(i)} todo={todo} />
            ))}
          </div>
        </section>
      </main>
      <NoSSRCategoryDrawer user={user as User} />
    </>
  )
}

export default TasksView
