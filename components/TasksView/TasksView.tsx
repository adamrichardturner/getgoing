'use client'
import { useEffect } from 'react'
import TaskForm from '../TaskForm/TaskForm'
import Task from '../Task/Task'
import useMyTheme from '@/hooks/theme/index'
import useTodos from '@/hooks/todos'

const TaskView = () => {
  const { loadTodos, todos } = useTodos()
  const { changeSmallScreen, smallScreen } = useMyTheme()

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768
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

  useEffect(() => {
    loadTodos()
  }, [])

  const todosList = todos.map((todo) => {
    return <Task key={todo.id} todo={todo} />
  })

  return (
    <main
      className={`${
        smallScreen ? 'pl-mainWide' : 'pl-main'
      } px-4 pb-20 bg-main h-content pt-20 flex flex-col w-full transition-all ease-in-out`}
    >
      <h2 className="text-right font-bold">My To Dos</h2>
      <section className="space-y-4 pt-2">
        <TaskForm />
        {todosList}
      </section>
    </main>
  )
}

export default TaskView
