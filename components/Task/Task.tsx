'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Category } from '@/types/Category'
import { useAppSelector } from '@/lib/hooks'
import { useEffect, useState, useRef } from 'react'
import TaskLoadingAnimation from '@/common/TaskLoadingAnimation/TaskLoadingAnimation'
import { motion } from 'framer-motion'
import useTodos from '@/hooks/todos'
import formatTimestamp from '@/utils/formatTimestamp'
import ColorSwatch from './ColorSwatch/ColorSwatch'
import AnimatedCheckbox from './AnimatedCheckbox/AnimatedCheckbox'
import { TaskContextMenu } from './TaskContextMenu'
import { Todo } from '@/types/Todo'
import { ItemTypes } from '@/views/TasksView/TasksView'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface DragItem {
  type: string
  id: number
  index: number
  todo: Todo
}

const Task = ({
  todo,
  index,
  handleUpdateTodoOrder,
}: {
  todo: Todo
  index: number
  handleUpdateTodoOrder: Function
}) => {
  const ref = useRef<any>(null)
  const lastHoverTimeRef = useRef(Date.now())
  const hoverThrottleTime = 100 // Throttle time in milliseconds
  const { toggleTodoCompleteCallback, changeComplete } = useTodos()
  const categories = useAppSelector((state) => state.categories.items)
  const category = getNameFromId(todo.category_id, categories)
  const [isLoading, setIsLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(todo.completed)

  // Drag and Drop Functionality
  const [{ isDragging }, drag, preview] = useDrag<DragItem, any, any>(() => ({
    type: ItemTypes.TASK,
    item: { type: ItemTypes.TASK, id: todo.id, index: index, todo },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  console.log(index)

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (item: DragItem, monitor) => {
      console.log('a')
      const currentTime = Date.now()
      if (currentTime - lastHoverTimeRef.current < hoverThrottleTime) {
        return
      }
      console.log('b')
      lastHoverTimeRef.current = currentTime
      if (!ref.current) {
        return
      }
      console.log('c')
      const dragIndex = item.index
      const hoverIndex = index
      console.log('d')

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      console.log('Drag Index:', dragIndex, 'Hover Index:', hoverIndex)
      console.log(
        'Hover Client Y:',
        hoverClientY,
        'Hover Middle Y:',
        hoverMiddleY
      )

      // Dragging conditions
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return
      }

      handleUpdateTodoOrder(dragIndex, hoverIndex)
      item.index = hoverIndex // Update the item's index
    },
  })

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

  const combinedRef = (el: HTMLDivElement) => {
    drag(el)
    drop(el)
    ref.current = el
  }

  drag(drop(ref))

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={variants}
      transition={{ duration: 0.25 }}
      className='max-w-auto'
      ref={combinedRef}
    >
      <article
        ref={drag}
        className='z-1 bg-task shadow hover:shadow-md hover:bg-darktask flex flex-row justify-between cursor-pointer rounded-lg py-5 pl-0 pr-3'
      >
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
