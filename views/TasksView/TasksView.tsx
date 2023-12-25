'use client'

import { useEffect } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import Task from '../../components/Task/Task'
import useMyTheme from '@/hooks/theme/index'
import useTodos from '@/hooks/todos'
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
  const { loadTodos } = useTodos()
  const { changeSmallScreen, isDrawerOpen, updateDrawerOpen } = useMyTheme()
  const { filteredAndSortedTodos } = useControl()

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

  const mainStyle = isDrawerOpen ? 'main-open' : 'main-closed'

  return (
    <>
      <main className={`relative pt-mainTop z-4 ${mainStyle}`}>
        <section className='space-y-4 px-4'>
          <Controls />
          <TaskForm />
          {filteredAndSortedTodos.map((todo: Todo, i) => (
            <Task key={String(todo.id) + String(i)} todo={todo} />
          ))}
        </section>
      </main>
      <NoSSRCategoryDrawer />
    </>
  )
}

export default TasksView
