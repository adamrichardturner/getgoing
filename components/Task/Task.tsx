'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Category } from '@/types/Category'
import { useAppSelector } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import TaskLoadingAnimation from '@/common/TaskLoadingAnimation/TaskLoadingAnimation'
import { motion } from 'framer-motion'
import useTodos from '@/hooks/todos'
import formatTimestamp from '@/utils/formatTimestamp'
import ColorSwatch from './ColorSwatch/ColorSwatch'
import AnimatedCheckbox from './AnimatedCheckbox/AnimatedCheckbox'
import { TaskContextMenu } from './TaskContextMenu'
import { Todo } from '@/types/Todo'
import { ItemTypes } from '@/views/TasksView/TasksView'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface DragItem {
  todo: Todo
}

const Task = ({ todo }: { todo: Todo }) => {
  const { toggleTodoCompleteCallback, changeComplete } = useTodos()
  const categories = useAppSelector((state) => state.categories.items)
  const category = getNameFromId(todo.category_id, categories)
  const [isLoading, setIsLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(todo.completed)

  // Drag and Drop Functionality
  const [{ isDragging }, drag, preview] = useDrag<DragItem, any, any>(() => ({
    type: ItemTypes.TASK,
    item: { todo },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [todo])

  // Helper functions
  function getNameFromId(id: number, array: Category[]): string | null {
    const item = array.find((obj) => obj.id === id)
    return item ? item.name : null
  }

  async function handleClickComplete() {
    changeComplete(todo.id)
    await toggleTodoCompleteCallback(todo.id)
  }

  if (isLoading) {
    return <TaskLoadingAnimation />
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: isDragging ? 0.5 : 1 },
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={variants}
      transition={{ duration: 0.25 }}
      className='max-w-auto'
      ref={drag}
    >
      <article className='z-1 bg-task shadow hover:shadow-md hover:bg-darktask flex flex-row justify-between cursor-pointer rounded-lg py-5 pl-0 pr-3'>
        <div className='flex flex-row items-center space-x-2'>
          <TaskContextMenu todo={todo} id={todo.category_id} />
          <div>
            <AnimatedCheckbox
              id={todo.id}
              handleClickComplete={handleClickComplete}
              borderColor={'var(--btnOutline)'}
              checkColor={'var(--completed)'}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <div className='flex flex-col text-bodyText'>
            <div className='pr-2'>
              <p
                className={`${
                  isChecked
                    ? 'line-through text-btnOutline font-light text-pretty'
                    : 'text-bodyText'
                } text-sm sm:text-sml leading-tight font-light text-wrap break-all lxs:break-keep hyphens-auto lsx:hyphens-none`}
              >
                {todo.content}
              </p>
            </div>
            <div className='flex flex-col sm:flex-row flex-wrap text-xxs sm:text-xsl pt-.5'>
              {category ? (
                <div className='font-light text-btnOutline flex flex-row items-center pr-3'>
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className={`text-btnOutline items-center justify-center pr-1.5`}
                  />
                  <p className='font-light text-btnOutline'>{category}</p>
                </div>
              ) : null}
              {todo.due_date && (
                <div className='flex items-center text-btnOutline flex-row flex-wrap pt-0.5 xs:pt-0'>
                  <FontAwesomeIcon
                    icon={faBell}
                    className='text-btnOutline items-center justify-center pl-[1px] sm:pl-0 pr-[8px] sm:pr-1.5'
                  />
                  <p className='font-light text-btnOutline'>
                    {formatTimestamp(todo.due_date)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={'flex items-center'}>
          <ColorSwatch
            background={todo.color || 'var(--default-color)'}
            height={20}
            width={20}
          />
        </div>
      </article>
    </motion.div>
  )
}

export default Task
