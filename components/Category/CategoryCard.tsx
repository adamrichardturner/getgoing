'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import { Input } from '../ui/input'
import { Category } from '@/types/Category'
import { ItemTypes } from '@/views/TasksView/TasksView'
import { useDrag, useDrop } from 'react-dnd'
import CategoryDeleteAlert from '../CategoriesDrawer/CategoryDeleteAlert'
import useCategories from '@/hooks/categories'
import useMyTheme from '@/hooks/theme'
import useTodos from '@/hooks/todos'
import { PreFormTodo, Todo } from '@/types/Todo'
import { useMediaQuery } from '@uidotdev/usehooks'

interface CategoryCardProps {
  category: Category
  editedCategory: {
    id: number | null
    name: string
  }
  editMode: boolean
  handleSubmitEdit: () => Promise<void>
  setEditedCategory: (category: { id: number | null; name: string }) => void
  handleDeleteCategory: (categoryId: number) => Promise<void>
}

interface DraggedItem {
  todo: Todo
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  editedCategory,
  editMode,
  handleSubmitEdit,
  setEditedCategory,
  handleDeleteCategory,
}) => {
  const { selectedCategory, updateCategoryChosen } = useCategories()
  const smallScreen = useMediaQuery('only screen and (max-width : 768px)')
  const { updateDrawerOpen } = useMyTheme()
  const { handlePatchTodo, loadTodos, todos, filterByCategory } = useTodos()

  // Drag and Drop Functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CATEGORYCARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const handleEditTodo = async (task: PreFormTodo) => {
    const newTaskData = {
      ...task,
      category_id: category.id,
    }

    try {
      if (!task.id) return null
      await handlePatchTodo(task.id, newTaskData)
      await loadTodos()
    } catch (error) {
      console.error(error)
    }
  }

  const [{ isOver }, drop] = useDrop<DraggedItem, any, { isOver: boolean }>(
    () => ({
      accept: ItemTypes.TASK,
      drop: (item, monitor) => {
        if (item && item.todo) {
          const dueDate = item.todo.due_date
            ? new Date(item.todo.due_date)
            : null

          const preFormTodo: PreFormTodo = {
            ...item.todo,
            due_date: dueDate,
          }

          handleEditTodo(preFormTodo)
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    })
  )

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
    if (smallScreen) updateDrawerOpen(false)
  }

  const handleEditCategory = (category: Category) => {
    setEditedCategory(category)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCategory({ ...editedCategory, name: e.target.value })
  }

  const handleIsOpen = () => {
    setAlertIsOpen(!isAlertOpen)
  }

  const [isAlertOpen, setAlertIsOpen] = useState<boolean>(false)

  const isEditingThisCategory = editedCategory.id === category.id

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
      ref={drop}
    >
      <li
        className={`flex flex-row justify-between px-4 py-3 space-x-3 rounded text-sm w-full ${
          selectedCategory === category.id || isOver
            ? 'bg-itemHover hover:bg-itemHover text-primary font-regular'
            : 'hover:bg-itemHover text-bodyText font-light hover:text-primary'
        } ${editMode ? 'cursor-default' : 'cursor-pointer'} `}
        onClick={!editMode ? () => handleCategoryClick(category.id) : undefined}
      >
        {isEditingThisCategory ? (
          <Input
            type='text'
            value={editedCategory.name}
            onChange={handleEditChange}
            className='flex-grow py-2 px-3'
          />
        ) : (
          <div className='flex items-center space-x-2'>
            {selectedCategory === category.id ? (
              <FontAwesomeIcon
                icon={fasCircle}
                style={{ color: 'var(--highlight)' }}
              />
            ) : (
              <FontAwesomeIcon icon={farCircle} />
            )}
            <span className='leading-tight text-high-contrast'>
              {category.name}
            </span>
          </div>
        )}
        {editMode ? (
          <div className='transition-opacity duration-300 space-x-3 ease-in-out flex flex-row items-center'>
            <button
              onClick={() => handleEditCategory(category)}
              className='cursor-pointer'
            >
              <FontAwesomeIcon
                icon={isEditingThisCategory ? faCheck : faEdit}
                onClick={
                  isEditingThisCategory
                    ? () => handleSubmitEdit()
                    : () => setEditedCategory({ id: null, name: '' })
                }
              />
            </button>
            <CategoryDeleteAlert
              category={category}
              isOpen={isAlertOpen}
              handleIsOpen={handleIsOpen}
              handleDeleteCategory={handleDeleteCategory}
            />
          </div>
        ) : (
          <span>{filterByCategory(todos, category.id).length}</span>
        )}
      </li>
    </motion.div>
  )
}

export default CategoryCard
