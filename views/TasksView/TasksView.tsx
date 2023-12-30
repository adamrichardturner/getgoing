'use client'

import {
  Reorder,
  useDragControls,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'
import { FC, useEffect } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import TaskStatic from '../../components/Task/TaskStatic'
import TaskDraggable from '@/components/Task/TaskDraggable'
import useMyTheme from '@/hooks/theme/index'
import useCategories from '@/hooks/categories'
import useTodos from '@/hooks/todos'
import Controls from '../../components/Controls/Controls'
import useControl from '@/hooks/control'
import { Todo } from '@/types/Todo'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskDragLayer from '@/components/Task/TaskDragLayer'
import CategoriesDrawer from '@/components/CategoriesDrawer/CategoriesDrawer'
import { useMediaQuery } from '@uidotdev/usehooks'
export const ItemTypes = {
  TASK: 'task',
  CATEGORYCARD: 'categoryCard',
}

const TasksView: FC = () => {
  const y = useMotionValue(0)
  const controls = useDragControls()
  const { loadCategories } = useCategories()
  const { loadTodos, handleUpdateTodoOrder, updateTodos } = useTodos()
  const { isDrawerOpen, updateDrawerOpen } = useMyTheme()
  const { filteredAndSortedTodos, selectedAscending } = useControl()
  const smallScreen = useMediaQuery('only screen and (max-width : 767px)')

  useEffect(() => {
    if (!smallScreen) updateDrawerOpen(true)
    const initialize = async () => {
      await loadCategories()
      await loadTodos()
    }

    initialize()
  }, [])

  const mainStyle = isDrawerOpen ? 'main-open' : 'main-closed'

  const onReorder = async (newOrder: Todo[]) => {
    updateTodos(newOrder) // Update local state immediately for a responsive UI

    // Prepare data for updating the order in the database
    const updatedTodos = newOrder.map((item, index) => ({
      ...item,
      id: item.id,
      order_index: index,
    }))

    await handleUpdateTodoOrder(updatedTodos) // Update order in the database
  }

  const renderTodos = () => {
    const finalTodos = selectedAscending
      ? [...filteredAndSortedTodos]
      : [...filteredAndSortedTodos].reverse()

    if (!smallScreen) {
      return (
        <DndProvider backend={HTML5Backend}>
          <main className={`pt-mainTop w-full flex flex-row z-4 ${mainStyle}`}>
            <div className='space-y-2 w-full flex-none px-4'>
              <Controls />
              <TaskForm />
              <Reorder.Group
                axis='y'
                onReorder={onReorder}
                values={finalTodos}
                className='space-y-3'
              >
                <AnimatePresence>
                  {finalTodos.map((item, index) => {
                    return (
                      <Reorder.Item key={item.id} value={item}>
                        <TaskDraggable
                          key={item.id}
                          todo={item}
                          index={index}
                          dragListener={false}
                          dragControls={controls}
                          handleUpdateTodoOrder={handleUpdateTodoOrder}
                        />
                      </Reorder.Item>
                    )
                  })}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          </main>
          <CategoriesDrawer />
          <TaskDragLayer dragControls={controls} dragListener={false} />
        </DndProvider>
      )
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <main className={`pt-mainTop w-full flex flex-row z-4 ${mainStyle}`}>
          <div className='space-y-2 w-full flex-none px-4'>
            <Controls />
            <TaskForm />
            {finalTodos.map((item) => {
              return <TaskStatic key={item.id} todo={item} />
            })}
          </div>
        </main>
        <CategoriesDrawer />
      </DndProvider>
    )
  }
  return renderTodos()
}

export default TasksView
