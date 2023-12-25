'use client'

import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import useCategories from '@/hooks/categories'
import useTodos from '@/hooks/todos'
import { Category } from '@/types/Category'
import useMyTheme from '@/hooks/theme'
import DisableBodyScroll from '../DisableBodyScroll'
import { CategoryDrawerAdder } from './CategoryDrawerAdder'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import CategoryCard from '../Category/CategoryCard'
import { ItemTypes } from '@/views/TasksView/TasksView'
import { useDrop } from 'react-dnd'
import { PreFormTodo } from '@/types/Todo'

const CategoriesDrawer: FC = () => {
  if (typeof window === 'undefined') return null

  const {
    categories,
    updateCategoryChosen,
    selectedCategory,
    renameCategory,
    removeCategory,
  } = useCategories()
  const { todos, handlePatchTodo, loadTodos } = useTodos()
  const { smallScreen, isDrawerOpen, updateDrawerOpen } = useMyTheme()
  const [isAlertOpen, setAlertIsOpen] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editedCategory, setEditedCategory] = useState<any>({
    id: null,
    name: '',
  })

  const validateForm = (str: string) => {
    if (str.trim().length < 3) {
      return false
    } else if (str.trim().length > 33) {
      return false
    }
    return true
  }

  function isPayloadActionWithMessage(
    response: any
  ): response is { payload: { message: string } } {
    return (
      response &&
      response.payload &&
      typeof response.payload.message === 'string'
    )
  }

  const handleSubmitEdit = async () => {
    setIsLoading(true)
    if (!editedCategory.id) return
    try {
      if (!validateForm(editedCategory.name))
        throw new Error(
          'Category name must be greater than 3 characters and less than 33 in length.'
        )
      const response = await renameCategory(editedCategory)
      if (isPayloadActionWithMessage(response)) {
        toast({
          title: 'Success',
          description: response.payload.message,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Failed to edit category',
          description: error.message,
        })
      }
    } finally {
      setEditedCategory({ id: null, name: '' })
      setIsLoading(false)
    }
  }

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      setIsLoading(true)
      await removeCategory(categoryId)
    } catch (error) {
      console.error(error)
    } finally {
      setEditedCategory({ id: null, name: '' })
      setEditMode(false)
      setIsLoading(false)
    }
  }

  const handleEditModeToggle = () => {
    setEditedCategory({ id: null, name: '' })
    setEditMode(!editMode)
  }

  const variants = {
    open: { width: '16rem', left: 0, zIndex: 6, height: '100%' },
    closed: { width: '16rem', left: '-16rem', zIndex: 6, height: '100%' },
  }

  const handleBackdropClick = () => updateDrawerOpen(false)

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
    if (smallScreen) updateDrawerOpen(false)
  }

  const handleDrawer = () => {
    isDrawerOpen ? updateDrawerOpen(false) : updateDrawerOpen(true)
  }

  const renderCategorySkeletons = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className='my-2 w-full h-8' />
    ))

  const renderCategories = () =>
    isLoading
      ? renderCategorySkeletons()
      : categories.slice(0, 7).map((category: Category) => {
          if (!category.id) return null
          return (
            <CategoryCard
              key={category.id}
              category={category}
              editedCategory={editedCategory}
              editMode={editMode}
              handleSubmitEdit={handleSubmitEdit}
              setEditedCategory={setEditedCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          )
          // <li
          //   key={category.id}
          //   className={`flex flex-row justify-between px-4 py-3 space-x-3 rounded cursor-pointer text-xls sm:text-sm w-full ${
          //     selectedCategory === category.id
          //       ? 'bg-itemHover hover:bg-itemHover text-primary font-regular'
          //       : 'hover:bg-itemHover text-bodyText font-light hover:text-primary'
          //   }`}
          //   onClick={() => handleCategoryClick(category.id)}
          // >
          //   {isEditingThisCategory ? (
          //     <Input
          //       type='text'
          //       value={editedCategory.name}
          //       onChange={handleEditChange}
          //       className='flex-grow py-2 px-3'
          //     />
          //   ) : (
          //     <div className='flex items-center space-x-2'>
          //       {selectedCategory === category.id ? (
          //         <FontAwesomeIcon
          //           icon={fasCircle}
          //           style={{ color: 'var(--highlight)' }}
          //         />
          //       ) : (
          //         <FontAwesomeIcon icon={farCircle} />
          //       )}
          //       <span className='leading-tight text-high-contrast'>
          //         {category.name}
          //       </span>
          //     </div>
          //   )}
          //   {editMode ? (
          //     <div className='transition-opacity duration-300 space-x-3 ease-in-out flex flex-row items-center'>
          //       <button onClick={() => handleEditCategory(category)}>
          //         <FontAwesomeIcon
          //           icon={isEditingThisCategory ? faCheck : faEdit}
          //           onClick={
          //             isEditingThisCategory
          //               ? () => handleSubmitEdit()
          //               : () => setEditedCategory({ id: null, name: '' })
          //           }
          //         />
          //       </button>
          //       <CategoryDeleteAlert
          //         category={category}
          //         isOpen={isAlertOpen}
          //         handleIsOpen={handleIsOpen}
          //         handleDeleteCategory={handleDeleteCategory}
          //       />
          //     </div>
          //   ) : (
          //     <span>
          //       {
          //         filterByCategory(todos, category.id).filter(
          //           (todo) => !todo.completed
          //         ).length
          //       }
          //     </span>
          //   )}
          // </li>
        })

  return (
    <>
      {isDrawerOpen && smallScreen && (
        <>
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-6'
            onClick={handleBackdropClick}
          ></div>
          <DisableBodyScroll />
        </>
      )}
      <motion.div
        id='sidebar'
        className='bg-drawer overflow-hidden fixed h-screen z-6 shadow-md'
        variants={variants}
        initial={smallScreen ? 'closed' : 'open'}
        animate={isDrawerOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      >
        {isLoading ? (
          <div className='flex w-full min-h-screen flex-col overflow-y-auto bg-drawer pb-4 pt-catTop'>
            {renderCategorySkeletons()}
          </div>
        ) : (
          <div className='flex w-full min-h-screen flex-col overflow-y-auto bg-drawer pb-4 pt-catTop'>
            <div className='space-y-0'>
              <button
                className='pl-4 text-bodyText text-xl relative bottom-burgerBottom cursor-pointer icon-fade'
                onClick={handleDrawer}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              {!editMode && (
                <li
                  key={999}
                  onClick={() => handleCategoryClick(999)}
                  className={`flex flex-row justify-between px-4 py-3 rounded cursor-pointer text-xls sm:text-sm w-full ${
                    selectedCategory === 999
                      ? 'bg-itemHover hover:bg-itemHover text-primary font-regular'
                      : 'hover:bg-itemHover text-bodyText font-light hover:text-primary'
                  }`}
                >
                  <div className='space-x-2 flex flex-row items-center'>
                    {selectedCategory === 999 ? (
                      <FontAwesomeIcon
                        icon={fasCircle}
                        style={{ color: 'var(--highlight)' }}
                      />
                    ) : (
                      <FontAwesomeIcon icon={farCircle} />
                    )}
                    <span className='leading-tight text-high-contrast'>
                      All Tasks
                    </span>
                  </div>
                  <span>{todos.filter((todo) => !todo.completed).length}</span>
                </li>
              )}
              <ul>{renderCategories()}</ul>
            </div>
            <div className='absolute bottom-0 w-full px-4 space-y-3'>
              {editMode && categories.length < 7 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CategoryDrawerAdder />
                </motion.div>
              )}
              <div className='flex items-center justify-start space-x-2 pb-4'>
                <Switch
                  checked={editMode}
                  onCheckedChange={handleEditModeToggle}
                  className={
                    editMode
                      ? 'bg-high-contrast'
                      : 'bg-slate-400 dark:bg-slate-200'
                  }
                />
                <span className='text-high-contrast text-xs'>
                  Edit Categories
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default CategoriesDrawer
