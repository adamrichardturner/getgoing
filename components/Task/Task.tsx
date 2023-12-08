'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Category } from '@/types/Category'
import { useAppSelector } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import TaskLoadingAnimation from '@/common/TaskLoadingAnimation/TaskLoadingAnimation'
import { motion } from 'framer-motion'
import useTodos from '@/hooks/todos'
import { convertDateFormat } from '@/lib/utils'
import ColorSwatch from './ColorSwatch/ColorSwatch'
import AnimatedCheckbox from './AnimatedCheckbox/AnimatedCheckbox'

// Define the animation variants
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const Task = ({ todo }: any) => {
  const { toggleTodoCompleteCallback } = useTodos()
  const categories = useAppSelector((state) => state.categories.items)
  const category = getNameFromId(todo.category_id, categories)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [todo])

  // Helper functions
  function getNameFromId(id: number, array: Category[]): string | null {
    const item = array.find((obj) => obj.id === id)
    return item ? item.name : null
  }

  async function handleClickComplete() {
    await toggleTodoCompleteCallback(todo.id)
  }

  // Return the loading animation if the data is still loading
  if (isLoading) {
    return <TaskLoadingAnimation />
  }

  // Once the data has loaded, return the task content
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.25 }}
      className="max-w-auto"
    >
      <article className="z-4 bg-task hover:bg-darktask flex flex-row justify-between shadow hover:shadow-md cursor-pointer rounded-lg py-5 pl-3 pr-3">
        <div className="flex flex-row items-center space-x-2">
          <div>
            <AnimatedCheckbox
              handleClickComplete={handleClickComplete}
              borderColor={'var(--btnOutline)'}
              checkColor={'var(--completed)'}
              isChecked={todo.completed}
            />
          </div>
          <div className="flex flex-col text-bodyText">
            <div>
              <p
                className={
                  todo.completed
                    ? 'line-through ' + `text-bodyText text-md`
                    : '' + `text-md`
                }
              >
                {todo.content}
              </p>
            </div>
            <div className="flex flex-row text-xs md:text-md space-x-3">
              {category ? (
                <div className="font-light text-subtext text-xs md:text-md">
                  {category}
                </div>
              ) : null}
              {todo.due_date && (
                <div className="flex text-btnOutline flex-row space-x-1">
                  <span>
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <p className="font-light text-subtext text-xs md:text-md">
                    Due {convertDateFormat(todo.due_date)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={'flex items-center'}>
          <ColorSwatch background={todo.color} height={20} width={20} />
        </div>
      </article>
    </motion.div>
  )
}

export default Task
