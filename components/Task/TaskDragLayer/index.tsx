import { CSSProperties } from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import TaskDraggable from '../TaskDraggable'
import { ItemTypes } from '@/views/TasksView/TasksView'
import useTodos from '@/hooks/todos'

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

const TaskDragLayer = (dragControls: any, dragListener: any) => {
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
        <div style={{ maxWidth: '30vw' }}>
          <TaskDraggable
            todo={item.todo}
            index={item.index}
            handleUpdateTodoOrder={handleUpdateTodoOrder}
            dragControls={dragControls}
            dragListener={dragListener}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskDragLayer
