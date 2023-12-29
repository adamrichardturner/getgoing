'use client'

import {
  Reorder,
  useDragControls,
  AnimatePresence,
  useMotionValue,
} from 'framer-motion'
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
  const y = useMotionValue(0)
  const controls = useDragControls()
  const { loadTodos, handleUpdateTodoOrder } = useTodos()
  const { loadCategories } = useCategories()
  const { changeSmallScreen, isDrawerOpen, updateDrawerOpen, smallScreen } =
    useMyTheme()

  const handleResize = () => {
    const screenWidth = window.innerWidth
    changeSmallScreen(screenWidth < 800)
    updateDrawerOpen(screenWidth >= 800)
  }

  const [items, setItems] = useState<Todo[]>([])

  useEffect(() => {
    const initialize = async () => {
      await loadCategories()
      console.log('hi')
      const loadedTodos = await loadTodos() // Fetch the latest todos
      setItems(loadedTodos) // Set them to local state
    }

    initialize()

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mainStyle = isDrawerOpen ? 'main-open' : 'main-closed'

  const onReorder = async (newOrder: Todo[]) => {
    setItems(newOrder) // Update local state immediately for a responsive UI

    // Prepare data for updating the order in the database
    const updatedTodos = newOrder.map((item, index) => ({
      ...item,
      id: item.id,
      order_index: index,
    }))
    setItems(updatedTodos)
    await handleUpdateTodoOrder(updatedTodos) // Update order in the database
  }

  if (smallScreen) {
    return (
      <DndProvider backend={HTML5Backend}>
        <main className={`relative pt-mainTop z-4 ${mainStyle}`}>
          <div className='space-y-4 px-4'>
            <Controls />
            <TaskForm />
            {items.map((todo: any, i) => (
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
          <div className='w-full flex-1'>{/* <Upcoming /> */}</div>
        </main>
        <NoSSRCategoryDrawer />
        <TaskDragLayer />
      </DndProvider>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`pt-mainTop w-full flex flex-row z-4 ${mainStyle}`}>
        <div
          className='space-y-2 w-full flex-none px-4'
          style={{
            width: smallScreen ? '100%' : '100%',
          }}
        >
          <Controls />
          <TaskForm />
          <Reorder.Group
            axis='y'
            onReorder={onReorder}
            values={items}
            className='space-y-3'
          >
            {items.map((item, index) => (
              <Reorder.Item
                key={item.id}
                value={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AnimatePresence>
                  <Task
                    todo={item}
                    index={index}
                    dragListener={false}
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
