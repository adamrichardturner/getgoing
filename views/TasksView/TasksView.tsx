'use client'

import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import Task from '../../components/Task/Task'
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
import { useAppSelector } from '@/lib/hooks'
import dynamic from 'next/dynamic'
import { useAppDispatch } from '@/lib/hooks'
import TasksLoadingAnimation from '@/common/TasksLoadingAnimation/TasksLoadingAnimation'
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
  const smallScreen = dynamic(() => import('@/hooks/theme'), {
    ssr: false,
    loading: <TasksLoadingAnimation />,
  })

  useEffect(() => {
    if (!smallScreen) updateDrawerOpen(true)
    const initialize = async () => {
      await loadCategories()
      const loadedTodos = await loadTodos()
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

    return finalTodos.map((item, index) => (
      <Reorder.Item key={item.id} value={item}>
        <Task
          key={item.id}
          todo={item}
          index={index}
          dragListener={true}
          dragControls={controls}
          handleUpdateTodoOrder={handleUpdateTodoOrder}
        />
      </Reorder.Item>
    ))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`pt-mainTop w-full flex flex-row z-4 ${mainStyle}`}>
        <div className='space-y-2 w-full flex-none px-4'>
          <Controls />
          <TaskForm />
          <Reorder.Group
            axis='y'
            onReorder={onReorder}
            values={filteredAndSortedTodos}
            className='space-y-3'
          >
            {renderTodos()}
          </Reorder.Group>
        </div>
      </main>
      <CategoriesDrawer />
      <TaskDragLayer dragControls={controls} dragListener={true} />
    </DndProvider>
  )
}

export default TasksView
