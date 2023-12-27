'use client'

import { Reorder, useDragControls, AnimatePresence } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import Task from '../../components/Task/Task'
import useMyTheme from '@/hooks/theme/index'
import useCategories from '@/hooks/categories'
import useTodos from '@/hooks/todos'
import Controls from '../../components/Controls/Controls'
import useControl from '@/hooks/control'
import { Todo } from '@/types/Todo'
import dynamic from 'next/dynamic'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskDragLayer from '@/components/Task/TaskDragLayer'

const NoSSRCategoryDrawer = dynamic(
  () => import('@/components/CategoriesDrawer/CategoriesDrawer'),
  { ssr: false }
)

export const ItemTypes = {
  TASK: 'task',
  CATEGORYCARD: 'categoryCard',
}

const TasksView: FC = () => {
  const controls = useDragControls()
  const { loadTodos, handleUpdateTodoOrder } = useTodos()
  const { loadCategories } = useCategories()
  const { changeSmallScreen, isDrawerOpen, updateDrawerOpen, smallScreen } =
    useMyTheme()
  const { filteredAndSortedTodos } = useControl()

  const handleResize = () => {
    const screenWidth = window.innerWidth
    changeSmallScreen(screenWidth < 800)
    updateDrawerOpen(screenWidth >= 800)
  }

  useEffect(() => {
    const loader = async () => {
      await loadCategories()
      loadTodos()
    }
    loader()

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize()
    }
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mainStyle = isDrawerOpen ? 'main-open' : 'main-closed'

  const [todos, setTodos] = useState(filteredAndSortedTodos)

  if (smallScreen) {
    return (
      <DndProvider backend={HTML5Backend}>
        <main className={`relative pt-mainTop z-4 ${mainStyle}`}>
          <div className='space-y-4 px-4'>
            <Controls />
            <TaskForm />
            {filteredAndSortedTodos.map((todo: any, i) => (
              <div className=''>
                <Task
                  key={todo.id}
                  todo={todo}
                  index={i}
                  handleUpdateTodoOrder={handleUpdateTodoOrder}
                  dragControls={controls}
                  dragListener={false}
                />
              </div>
            ))}
          </div>
        </main>
        <NoSSRCategoryDrawer />
        <TaskDragLayer />
      </DndProvider>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`relative pt-mainTop z-4 ${mainStyle}`}>
        <div className='space-y-4 px-4'>
          <Controls />
          <TaskForm />
          <Reorder.Group axis='y' values={todos} onReorder={setTodos}>
            {filteredAndSortedTodos.map((todo: any, index) => (
              <Reorder.Item
                key={todo.id.toString() + indexedDB.toString()}
                value={todo}
              >
                <AnimatePresence>
                  <Task
                    todo={todo}
                    index={index}
                    dragListener={false} // Changed based on smallScreen
                    dragControls={controls}
                    handleUpdateTodoOrder={handleUpdateTodoOrder}
                  />
                </AnimatePresence>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </main>
      <NoSSRCategoryDrawer />
      <TaskDragLayer dragControls={controls} dragListener={false} />
    </DndProvider>
  )
}

export default TasksView
