import { CSSProperties } from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import Task from '../Task'
import { ItemTypes } from '@/views/TasksView/TasksView'
import useTodos from '@/hooks/todos'
import useMyTheme from '@/hooks/theme'

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  let { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

const TaskDragLayer = () => {
  const { smallScreen } = useMyTheme()
  const { handleUpdateTodoOrder } = useTodos()
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  if (!isDragging || itemType !== ItemTypes.TASK) {
    return null
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div style={{ maxWidth: smallScreen ? '90vw' : '25vw' }}>
          <Task
            todo={item.todo}
            index={item.index}
            handleUpdateTodoOrder={handleUpdateTodoOrder}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskDragLayer
