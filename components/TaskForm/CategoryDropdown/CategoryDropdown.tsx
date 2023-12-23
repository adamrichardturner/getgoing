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
  } = useCategories()

  const [isHovering, setIsHovering] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [editMode, setEditMode] = useState(false)
  const [editedCategory, setEditedCategory] = useState({ id: null, name: '' })

  const handleEditCategory = (category: any) => {
    setEditMode(true)
    setEditedCategory(category)
  }

  const handleEditChange = (e: any) => {
    setEditedCategory({ ...editedCategory, name: e.target.value })
  }

  const handleSubmitEdit = () => {
    console.log('Edited category:', editedCategory)
    // Implement PUT request logic here
    setEditMode(false)
  }

  const toggleDeleteMode = () => setDeleteMode(!deleteMode)

  const handleCategoryClick = (categoryId: number) => {
    if (!deleteMode) {
      updateCategoryChosen(categoryId)
      onExpand(true)
      setIsOpen(false)
    }
  }

  const handleCloseDropdown = () => {
    if (isOpen) setDeleteMode(false)
    setIsOpen(false)
  }

  const handleDeleteCategory = (categoryId: number) => {
    console.log('Delete category:', categoryId)
    // Implement the category delete function here
  }

  const listItems = categories.map((category) => {
    const isEditingThisCategory = editMode && editedCategory.id === category.id
    return (
      <div className='flex items-center justify-start py-1' key={category.id}>
        <button
          onClick={() =>
            isEditingThisCategory
              ? handleSubmitEdit()
              : handleDeleteCategory(category.id)
          }
          className='mr-2'
        >
          <FontAwesomeIcon
            icon={isEditingThisCategory ? faCheck : faTimesCircle}
          />
        </button>
        <button
          onClick={() => handleEditCategory(category)}
          className={`mr-2 ${isEditingThisCategory ? 'hidden' : ''}`}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        {isEditingThisCategory ? (
          <input
            type='text'
            value={editedCategory.name}
            onChange={handleEditChange}
            className='flex-grow'
          />
        ) : (
          <DropdownMenuItem
            className='w-full cursor-pointer transition-color py-3 text-xs flex flex-row items-center justify-start'
            onClick={() => handleCategoryClick(category.id)}
            disabled={deleteMode || editMode}
          >
            {category.name}
          </DropdownMenuItem>
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
          {!deleteMode && (
            <DropdownMenuItem
              key={999}
              className={
                999 === selectedCategory
                  ? `text-bodyText py-2 cursor-pointer bg-itemHover hover:bg-itemHover text-xs`
                  : `text-bodyText py-2 cursor-pointer hover:bg-inputBar text-xs`
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
        {listItems.length <= 6 ? (
          <>
            <DropdownMenuSeparator />
            <CategoryAdder onSelect={onSelect} />
          </>
        ) : (
          <div className='flex flex-col items-start px-2 pt-3'>
            <div className='bg-inputBar'>
              <p className='text-xs font-semibold'>Max Categories!</p>
            </div>
            <button onClick={toggleDeleteMode} className='rounded'>
              <div className='py-2 bg-red-500 hover:bg-red-800 px-3 text-white font-semibold rounded'>
                {deleteMode ? 'Cancel Delete' : 'Delete Category'}
              </div>
            </button>
          </div>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
