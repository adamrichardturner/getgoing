'use client'
import { useEffect } from 'react'
import TaskForm from '../TaskForm/TaskForm'
import Task from '../Task/Task'
import useMyTheme from '@/hooks/theme/theme'

const TaskView = () => {
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

  return (
    <main
      className={`${
        smallScreen ? 'pl-mainWide' : 'pl-main'
      } px-4 bg-main h-screen pt-20 flex flex-col w-full`}
    >
      <h2 className="text-right font-bold">My To Dos</h2>
      <section className="space-y-4">
        <TaskForm />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </section>
    </main>
  )
}

export default TaskView
