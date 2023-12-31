'use client'

import {
  Reorder,
  useDragControls,
  AnimatePresence,
  motion,
} from 'framer-motion'
import { FC, useEffect } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
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
  const controls = useDragControls()
  const { loadCategories } = useCategories()
  const { loadTodos, handleUpdateTodoOrder, updateTodos } = useTodos()
  const { isDrawerOpen, updateDrawerOpen } = useMyTheme()
  const { filteredAndSortedTodos, selectedAscending, filteredSorted } =
    useControl()
  const smallScreen = useMediaQuery('only screen and (max-width : 800px)')

  useEffect(() => {
    if (!smallScreen) updateDrawerOpen(true)
    const initialize = async () => {
      await loadCategories()
      await loadTodos()
    }

    initialize()
  }, [])

  const onReorder = async (newOrder: Todo[]) => {
    updateTodos(newOrder)

    const updatedTodos = newOrder.map((item, index) => ({
      ...item,
      id: item.id,
      order_index: index,
    }))

    await handleUpdateTodoOrder(updatedTodos) // Update order in the database
  }

  const variants = {
    desktop: {
      open: {
        overflowY: 'auto',
        scrollbarGutter: smallScreen ? 'auto' : 'stable',
        padding: '1rem',
        width: smallScreen ? '100lvw' : 'calc(100lvw - 16rem)',
        position: 'relative',
        justifyContent: 'flex-start',
        zIndex: 0,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
      },
      closed: {
        overflow: 'hidden !important',
        width: '100lvw',
        left: '0',
        position: 'static',
        padding: '1rem',
        zIndex: 0,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
      },
    },
    mobile: {
      open: {
        transform: 'translateX(16rem)',
        scrollbarGutter: 'stable',
        width: '100lvw',
        position: 'relative',
        padding: '1rem',
        overflow: 'auto',
        zIndex: 0,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
      },
      closed: {
        scrollbarGutter: 'stable',
        transform: 'translateX(0)',
        overflow: 'hidden',
        width: '100lvw',
        marginLeft: '0',
        position: 'relative',
        padding: '1rem',
        zIndex: 1,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
      },
    },
  } as const

  const renderTodos = () => {
    const finalTodos = selectedAscending
      ? [...filteredAndSortedTodos]
      : [...filteredAndSortedTodos].reverse()

    // Rendering for desktop
    if (!smallScreen) {
      return (
        <DndProvider backend={HTML5Backend}>
          <motion.main
            variants={variants.desktop}
            initial={isDrawerOpen ? 'open' : 'closed'}
            animate={isDrawerOpen ? 'open' : 'closed'}
          >
            <div className='space-y-3 w-full flex-none'>
              <Controls />
              <TaskForm />
              <AnimatePresence>
                {filteredSorted ? (
                  // Render TaskDraggable without Reorder.Group for desktop when filteredSorted is true

                  finalTodos.map((item, index) => (
                    <TaskDraggable
                      key={item.id}
                      todo={item}
                      index={index}
                      dragListener={true}
                      dragControls={controls}
                      handleUpdateTodoOrder={handleUpdateTodoOrder}
                      filteredSorted={filteredSorted}
                    />
                  ))
                ) : (
                  // Render TaskDraggable with Reorder.Group for desktop
                  <Reorder.Group
                    axis='y'
                    onReorder={onReorder}
                    values={finalTodos}
                    className='space-y-3'
                  >
                    {finalTodos.map((item, index) => (
                      <Reorder.Item key={item.id} value={item}>
                        <TaskDraggable
                          key={item.id}
                          todo={item}
                          index={index}
                          dragListener={true}
                          dragControls={controls}
                          handleUpdateTodoOrder={handleUpdateTodoOrder}
                          filteredSorted={filteredSorted}
                        />
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}
              </AnimatePresence>
            </div>
          </motion.main>
          <CategoriesDrawer />
          <TaskDragLayer
            dragControls={controls}
            dragListener={!filteredSorted}
          />
        </DndProvider>
      )
    }

    // Rendering for mobile
    return (
      <DndProvider backend={HTML5Backend}>
        <motion.main
          variants={variants.mobile}
          initial={isDrawerOpen ? 'open' : 'closed'}
          animate={isDrawerOpen ? 'open' : 'closed'}
        >
          <div className='space-y-3 w-full flex-none static'>
            <Controls />
            <TaskForm />
            {finalTodos.map((item, index) => (
              <TaskDraggable
                key={item.id}
                todo={item}
                index={index}
                dragListener={false} // Dragging not needed on mobile
                dragControls={controls}
                handleUpdateTodoOrder={handleUpdateTodoOrder}
              />
            ))}
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
