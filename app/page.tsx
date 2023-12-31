'use client'

import TasksView from '@/views/TasksView/TasksView'
export default function Index() {
  return (
    <div className='flex items-end justify-end pt-[60px] w-screen overflow-hidden'>
      <TasksView />
    </div>
  )
}
