'use client'

import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Category } from '@/types/Category'
import { useAppSelector } from '@/lib/hooks'
import { useEffect, useState, useRef } from 'react'
import TaskLoadingAnimation from '@/common/TaskLoadingAnimation/TaskLoadingAnimation'
import { DragControls, motion, useMotionValue } from 'framer-motion'
import useTodos from '@/hooks/todos'
import formatTimestamp from '@/utils/formatTimestamp'
import ColorSwatch from './ColorSwatch/ColorSwatch'
import AnimatedCheckbox from './AnimatedCheckbox/AnimatedCheckbox'
import { TaskContextMenu } from './TaskContextMenu'
import { Todo } from '@/types/Todo'
import { ItemTypes } from '@/views/TasksView/TasksView'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import useMyTheme from '@/hooks/theme'
import { MdDragIndicator } from 'react-icons/md'

interface DragItem {
  type: string
  id: number
  index: number
  todo: Todo
}

interface TaskProps {
  todo: Todo
  index: number
  dragListener?: boolean
  dragControls?: DragControls | null
  handleUpdateTodoOrder?: (
    dragIndex: number,
    hoverIndex: number
  ) => Promise<
    | 'Todo order updated successfully'
    | 'Failed to update todo order'
    | undefined
  >
  filteredSorted?: boolean
}

const TaskDraggable: FC<TaskProps> = ({
  todo,
  index,
  filteredSorted,
  handleUpdateTodoOrder,
  dragListener,
  dragControls,
}) => {
  const ref = useRef<any>(null)
  const lastHoverTimeRef = useRef(Date.now())
  const hoverThrottleTime = 100 // Throttle time in milliseconds
  const { toggleTodoCompleteCallback, changeComplete } = useTodos()
  const categories = useAppSelector((state) => state.categories.items)
  const category = getNameFromId(todo.category_id, categories)
  const [isLoading, setIsLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(todo.completed)
  const { smallScreen } = useMyTheme()

  // Drag and Drop Functionality
  const [{ isDragging }, drag, preview] = useDrag<DragItem, any, any>(() => ({
    type: ItemTypes.TASK,
    item: { type: ItemTypes.TASK, id: todo.id, index: index, todo },
    canDrag: !smallScreen,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (item: DragItem, monitor) => {
      const currentTime = Date.now()
      if (currentTime - lastHoverTimeRef.current < hoverThrottleTime) {
        return
      }

      lastHoverTimeRef.current = currentTime
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

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

      // Dragging conditions
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return
      }
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

  const variants = smallScreen
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: !smallScreen && isDragging ? 0.5 : 1 },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: !smallScreen && isDragging ? 0.5 : 1 },
      }

  const combinedRef = (el: HTMLDivElement) => {
    drag(el)
    drop(el)
    ref.current = el
  }

  if (smallScreen) {
    return (
      <article className='max-w-auto min-h-[6rem] z-1 bg-task shadow hover:shadow-md hover:bg-darktask flex flex-row justify-between rounded-lg pl-0 pr-3'>
        <div className='flex flex-row items-center justify-between space-x-2 min-h-max'>
          <div className='cursor-pointer bg-none flex flex-col items-center justify-center pl-4 py-0 h-full'>
            <TaskContextMenu todo={todo} id={todo.category_id} />
          </div>

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
          <div className='flex flex-col text-bodyText pointer-events-none'>
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
    )
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
      <article
        className={`${
          filteredSorted ? 'cursor-default' : 'cursor-move'
        } max-w-auto min-h-[6rem] z-1 bg-task shadow hover:shadow-md hover:bg-darktask flex flex-row justify-between rounded-lg pl-0 pr-3`}
      >
        <div className='flex flex-row items-center justify-between space-x-2 min-h-max'>
          <div className='flex flex-col items-center justify-between pl-4 pt-4 pb-4 h-full'>
            <div ref={combinedRef} className='reorder-handle cursor-grabbing'>
              <MdDragIndicator />
            </div>
            <div className='cursor-context-menu'>
              <TaskContextMenu todo={todo} id={todo.category_id} />
            </div>
          </div>

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
          <div className='pointer-events-none flex flex-col text-bodyText'>
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
        <div className={'flex items-center relative'}>
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

export default TaskDraggable
