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

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const Task = ({ todo }: { todo: Todo }) => {
  const { toggleTodoCompleteCallback, changeComplete } = useTodos()
  const categories = useAppSelector((state) => state.categories.items)
  const category = getNameFromId(todo.category_id, categories)
  const [isLoading, setIsLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(todo.completed)

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

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={variants}
      transition={{ duration: 0.25 }}
      className='max-w-auto'
    >
      <article className='z-4 bg-task hover:bg-darktask flex flex-row justify-between shadow hover:shadow-md cursor-pointer rounded-lg py-5 pl-0 pr-3'>
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
                className={
                  isChecked
                    ? 'line-through ' +
                      `text-bodyText text-sm sm:text-md leading-1 max-w-sm text-wrap text-pretty`
                    : '' +
                      `text-sm sm:text-md leading-1 max-w-lg text-wrap break-all lxs:break-keep hyphens-auto`
                }
              >
                {todo.content}
              </p>
            </div>
            <div className='flex flex-row flex-wrap text-xs sm:text-sm'>
              {category ? (
                <div className='font-light text-subtext text-xs sm:text-sm pr-2 flex flex-row items-center'>
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className={`text-btnOutline items-center justify-center pr-1`}
                  />
                  {category}
                </div>
              ) : null}
              {todo.due_date && (
                <div className='flex text-btnOutline flex-row flex-wrap space-x-1'>
                  <span>
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <p className='font-light text-subtext text-xs sm:text-sm'>
                    Due {formatTimestamp(todo.due_date)}
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
