'use client'

import {
  Reorder,
  useDragControls,
  useMotionValue,
  AnimatePresence,
  motion,
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

const variants = {
  open: {
    overflow: 'hidden !important',
    width: 'calc(100% - 16rem)',
    left: '16rem',
    paddingLeft: '1rem',
    position: 'relative',
    zIndex: 6,
    transition: { type: 'tween', ease: 'easeIn', duration: 0.3 },
  },
  closed: {
    overflow: 'hidden !important',
    width: '100%',
    zIndex: 6,
    paddingLeft: '1rem',
    left: 0,
    transition: { type: 'tween', ease: 'easeIn', duration: 0.3 },
  },
}

const TasksView: FC = () => {
  const y = useMotionValue(0)
  const controls = useDragControls()
  const { loadCategories } = useCategories()
  const { loadTodos, handleUpdateTodoOrder, updateTodos } = useTodos()
  const { isDrawerOpen, updateDrawerOpen } = useMyTheme()
  const { filteredAndSortedTodos, selectedAscending, filteredSorted } =
    useControl()
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

    if (!smallScreen && !filteredSorted) {
      return (
        <DndProvider backend={HTML5Backend}>
          <motion.main
            className={`pt-mainTop mb-mainTop overflow-hidden w-full mx-0 pl-4 pr-0 mr-1 flex flex-row z-4`}
            variants={variants}
            initial={isDrawerOpen ? 'open' : 'closed'}
            animate={isDrawerOpen ? 'open' : 'closed'}
          >
            <div className='space-y-2 w-full flex-none'>
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
          </motion.main>
          <CategoriesDrawer />
          <TaskDragLayer dragControls={controls} dragListener={false} />
        </DndProvider>
      )
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <motion.main
          className={`pt-mainTop mb-mainTop overflow-hidden w-full mx-0 pl-4 pr-0 mr-1 flex flex-row z-4`}
          variants={variants}
          initial={isDrawerOpen ? 'open' : 'closed'}
          animate={isDrawerOpen ? 'open' : 'closed'}
        >
          <div className='space-y-2 w-full flex-none'>
            <Controls />
            <TaskForm />
            {finalTodos.map((item, index) => {
              return <TaskDraggable index={index} key={item.id} todo={item} />
            })}
          </div>
        </motion.main>
        <CategoriesDrawer />
        <TaskDragLayer dragControls={controls} dragListener={false} />
      </DndProvider>
    )
  }
  return renderTodos()
}

export default TasksView
