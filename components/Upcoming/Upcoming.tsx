import useControl from '@/hooks/control'
import Task from '../Task/Task'
import useMyTheme from '@/hooks/theme'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useTodos from '@/hooks/todos'
import { useDragControls } from 'framer-motion'

const Upcoming = () => {
  const controls = useDragControls()
  const { filteredAndSortedTodos } = useControl()
  const { handleUpdateTodoOrder } = useTodos()
  const { smallScreen } = useMyTheme()

  if (smallScreen) {
    return (
      <aside className='mt-upcomingTop w-full pr-4'>
        <h2 className='text-xl font-regular text-right'>Upcoming</h2>
        <div className='space-y-3'>
          {filteredAndSortedTodos
            .sort((a: any, b: any) => a.due_date - b.due_date)
            .map((todo, i) => {
              return (
                <Task
                  key={todo.id}
                  todo={todo}
                  index={i}
                  handleUpdateTodoOrder={handleUpdateTodoOrder}
                  dragControls={controls}
                  dragListener={false}
                />
              )
            })}
        </div>
      </aside>
    )
  }
  return (
    <aside className='mt-upcomingTop w-full pr-4'>
      <h2 className='text-xl font-regular text-right pb-0.5 text-high-contrast'>
        Upcoming
      </h2>
      <DndProvider backend={HTML5Backend}>
        <div className='space-y-3'>
          {filteredAndSortedTodos
            .sort((a: any, b: any) => a.due_date - b.due_date)
            .map((todo, i) => {
              return (
                <Task
                  key={todo.id}
                  todo={todo}
                  index={i}
                  handleUpdateTodoOrder={handleUpdateTodoOrder}
                  dragControls={controls}
                  dragListener={false}
                />
              )
            })}
        </div>
      </DndProvider>
    </aside>
  )
}

export default Upcoming
