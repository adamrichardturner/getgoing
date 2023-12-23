'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup,
  faTimesCircle,
  faPencilAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { CategoryAdder } from '../CategoryAdder/CategoryAdder'
import useCategories from '@/hooks/categories'
import { Button } from '@/components/ui/button'
import { deleteCategory } from '../../../lib/features/categories/categoriesSlice'
import { Category } from '@/types/Category'
import FormLoadingAnimation from '@/common/FormLoadingAnimation'
import { toast } from '@/components/ui/use-toast'
import { useAppSelector } from '@/lib/hooks'
import { useAppDispatch } from '@/lib/hooks'

interface CategoryDropdownProps {
  onSelect: (category: string) => void
  catExpanded: boolean
  onExpand: any
}

export function CategoryDropdown({
  onSelect,
  catExpanded,
  onExpand,
}: CategoryDropdownProps) {
  const {
    categories,
    selectedCategory,
    updateCategoryChosen,
    getCategoryNameById,
    removeCategory,
    renameCategory,
    loadCategories,
  } = useCategories()

  const dispatch = useAppDispatch()
  const categoryDeletionStatus = useAppSelector(
    (state) => state.categories.status
  )
  const categoryDeletionError = useAppSelector(
    (state) => state.categories.error
  )

  const [isHovering, setIsHovering] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [editMode, setEditMode] = useState(false)
  const [editedCategory, setEditedCategory] = useState<any>({
    id: null,
    name: '',
  })

  const handleEditCategory = (category: Category) => {
    setEditMode(true)
    setEditedCategory(category)
  }

  const handleEditChange = (e: { target: { value: any } }) => {
    setEditedCategory({ ...editedCategory, name: e.target.value })
  }

  const handleSubmitEdit = () => {
    if (editedCategory.id !== null) {
      renameCategory(editedCategory)
      loadCategories()
      setEditedCategory({ id: null, name: '' })
      setEditMode(false)
    }
  }

  const handleDeleteCategory = async (categoryId: number) => {
    setIsLoading(true)
    await dispatch(deleteCategory(categoryId))

    if (categoryDeletionStatus === 'succeeded') {
      toast({
        title: `Category with ID: ${categoryId} successfully deleted.`,
      })
      loadCategories()
    } else if (categoryDeletionStatus === 'failed') {
      toast({
        title: `Category failed to delete. ${
          categoryDeletionError || 'Unknown error occurred'
        }`,
      })
    }

    setIsLoading(false)
  }

  const toggleEditMode = () => setEditMode(!editMode)

  const handleCategoryClick = (categoryId: number) => {
    if (!deleteMode) {
      updateCategoryChosen(categoryId)
      onExpand(true)
      setIsOpen(false)
    }
  }

  const handleCloseDropdown = () => {
    if (isOpen) {
      setDeleteMode(false)
      setEditedCategory(null)
      setIsOpen(false)
    }
  }

  const listItems = categories.map((category: Category) => {
    if (!category.id) return null
    const isEditingThisCategory = editMode && editedCategory?.id === category.id
    const catKey = category.id.toString().concat(category.user_id)
    return (
      <div className='flex items-center justify-between' key={catKey}>
        {isEditingThisCategory ? (
          <input
            type='text'
            value={editedCategory.name}
            onChange={handleEditChange}
            className='flex-grow py-3 px-2'
          />
        ) : (
          <>
            <DropdownMenuItem
              className={`${
                selectedCategory === category.id
                  ? 'bg-itemHover hover:bg-itemHover py-3'
                  : 'hover:bg-itemHover py-3'
              } w-full cursor-pointer transition-color text-xs flex justify-between items-center`}
              onClick={() => handleCategoryClick(category.id)}
              disabled={editMode}
            >
              <span className='text-left max-w-[80%] leading-none'>
                {category.name}
              </span>
            </DropdownMenuItem>
            <>
              {editMode && (
                <div className='relative right-1.5 bottom-1 w-4 flex flex-row'>
                  <button
                    onClick={() =>
                      isEditingThisCategory
                        ? handleSubmitEdit()
                        : handleDeleteCategory(category.id)
                    }
                    className='right-6 relative cursor-pointer'
                  >
                    <FontAwesomeIcon
                      icon={isEditingThisCategory ? faCheck : faTimesCircle}
                    />
                  </button>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className={`right-2 relative ${
                      isEditingThisCategory ? 'hidden' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </div>
              )}
            </>
          </>
        )}
      </div>
    )
  })

  return (
    <DropdownMenu
      modal={false}
      open={isOpen}
      onOpenChange={handleCloseDropdown}
    >
      <DropdownMenuTrigger asChild>
        <div
          className={`${
            catExpanded
              ? 'w-8 h-8 px-2 space-x-1 py-0 sm:w-auto bg-inputBar text-primary border border-itemBorder hover:shadow-lg'
              : 'w-8 h-8'
          } text-btnOutline hover:text-primary flex-none py-0 flex flex-row items-center justify-center rounded-md hover:border-1 hover:border hover:border-itemBorder hover:shadow-lg hover:bg-inputBar`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon
            icon={faLayerGroup}
            className={
              selectedCategory || isHovering
                ? `w-4 h-4 text-primary items-center justify-center`
                : `text-btnOutline hover:text-primary w-4 h-4 items-center justify-center`
            }
          />
          <span
            className={`${
              isHovering ? 'text-primary text-xs' : 'text-btnOutline text-xs'
            } ${
              catExpanded
                ? 'hidden sm:block text-primary'
                : ' text-btnOutline hidden'
            }`}
          >
            {getCategoryNameById(selectedCategory)}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='DropdownMenuContent min-w-full md:w-auto shadow hover:shadow-lg text-right text-xs font-regular px-0 py-2'>
        <DropdownMenuGroup>
          <h3 className='text-left text-sm sm:text-md font-semibold mt-0 py-2 px-2'>
            Category Select & Editor
          </h3>
          {!deleteMode && (
            <DropdownMenuItem
              key={999}
              className={
                999 === selectedCategory
                  ? `text-bodyText py-2 cursor-pointer bg-itemHover hover:bg-itemHover text-xs`
                  : `text-bodyText py-2 cursor-pointer hover:bg-itemHover text-xs`
              }
              onClick={() => handleCategoryClick(999)}
              onPointerLeave={(event) => event.preventDefault()}
              onPointerMove={(event) => event.preventDefault()}
            >
              All Tasks
            </DropdownMenuItem>
          )}
          {listItems}
        </DropdownMenuGroup>
        {listItems.length <= 6 && (
          <div>
            <DropdownMenuSeparator />
            <CategoryAdder
              onSelect={onSelect}
              isLoading={isLoading}
              editMode={editMode}
            />
          </div>
        )}
        <div className='flex flex-col justify-start text-left items-start px-2'>
          {categories.length >= 7 && (
            <p className='text-xxs text-alert leading-none py-2'>
              Maximum number of categories created, click edit to delete
              existing categories before making new categories.
            </p>
          )}
          {isLoading ? (
            <FormLoadingAnimation />
          ) : (
            <div className='flex flex-col justify-start text-left items-start w-full'>
              {categories.length >= 7 && (
                <p className='text-xxs text-alert leading-none py-2'>
                  Maximum number of categories created, click edit to delete
                  existing categories before making new categories.
                </p>
              )}
              {!editMode ? (
                <Button
                  type='button'
                  className='w-full h-9 mt-2 flex flex-row space-x-2 bg-default-color text-white dark:text-white'
                  onClick={() => setEditMode(true)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} className='text-white' />
                  <span>Edit Categories</span>
                </Button>
              ) : (
                <Button
                  type='button'
                  className='w-full h-9 mt-2 flex flex-row space-x-2 bg-default-color text-white dark:text-white'
                  onClick={handleSubmitEdit}
                >
                  <FontAwesomeIcon icon={faPencilAlt} className='text-white' />
                  <span>Update Category</span>
                </Button>
              )}
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
