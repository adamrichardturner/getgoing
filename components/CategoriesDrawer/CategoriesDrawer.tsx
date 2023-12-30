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
import { useMediaQuery } from '@uidotdev/usehooks'

const CategoriesDrawer: FC = () => {
  if (typeof window === 'undefined') return null

  const {
    categories,
    updateCategoryChosen,
    selectedCategory,
    renameCategory,
    removeCategory,
  } = useCategories()

  const { todos } = useTodos()
  const smallScreen = useMediaQuery('only screen and (max-width : 800px)')
  const { isDrawerOpen, updateDrawerOpen }: any = useMyTheme()

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
    open: {
      width: '16rem',
      left: 0,
      zIndex: 6,
      bottom: 0,
      top: '60px',
    },
    closed: {
      width: '16rem',
      left: '-16rem',
      zIndex: 6,
    },
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
        className={`bg-drawer flex flex-col items-between overflow-hidden fixed top-[60px] z-6 shadow-md`}
        variants={variants}
        initial={smallScreen ? 'closed' : 'open'}
        animate={isDrawerOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      >
        {isLoading ? (
          <div className='flex w-full min-h-full flex-col items-between overflow-y-auto bg-drawer pb-4'>
            {renderCategorySkeletons()}
          </div>
        ) : (
          <div className='flex flex-col items-end h-full'>
            <button
              className='pl-4 pr-4 pt-burgerTop text-bodyText text-xl relative bottom-burgerBottom cursor-pointer icon-fade'
              onClick={handleDrawer}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div className='flex w-full h-full min-h-full flex-col items-between justify-between overflow-y-auto bg-drawer pb-4'>
              <div className='space-y-0'>
                <h2 className='px-4 font-regular text-xl text-high-contrast pt-catTop pb-2'>
                  Categories
                </h2>
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
                    <span>
                      {todos.filter((todo) => !todo.completed).length}
                    </span>
                  </li>
                )}

                <ul>{renderCategories()}</ul>
              </div>
              <div className='w-full px-4 pb-4 space-y-3'>
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
          </div>
        )}
      </motion.div>
    </>
  )
}

export default CategoriesDrawer
