'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { CategoryAdder } from '../CategoryAdder/CategoryAdder'
import useCategories from '@/hooks/categories'
import { useState } from 'react'

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

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
    onExpand(true)
  }

  const listItems = categories
    .map((category) => {
      return (
        <DropdownMenuItem
          key={category.id}
          className={
            category.id == selectedCategory
              ? `text-bodyText cursor-pointer bg-itemHover hover:bg-itemHover`
              : `text-bodyText cursor-pointer bg-inputBar hover:bg-itemHover`
          }
          onClick={() => handleCategoryClick(category.id)}
          onPointerLeave={(event) => event.preventDefault()}
          onPointerMove={(event) => event.preventDefault()}
        >
          {category.name}
        </DropdownMenuItem>
      )
    })
    .slice(0, 7)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div
          className={`${
            catExpanded
              ? 'w-8 h-8 px-2 space-x-1 py-0 sm:w-auto bg-inputBar text-primary border border-itemBorder hover:shadow-lg'
              : 'w-8 h-8'
          } text-btnOutline hover:text-primary flex-none py-0 flex flex-row items-center justify-center rounded-md hover:border-1 hover:border hover:border-itemBorder hover:shadow-lg hover:bg-inputBar`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
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
      <DropdownMenuContent className='DropdownMenuContent min-w-full md:w-auto shadow hover:shadow-lg text-right text-xs font-regular'>
        <DropdownMenuGroup>
          <DropdownMenuItem
            key={999}
            className={
              999 == selectedCategory
                ? `text-bodyText cursor-pointer hover:bg-inputBar`
                : `text-bodyText cursor-pointer hover:bg-inputBar`
            }
            onClick={() => handleCategoryClick(999)}
            onPointerLeave={(event) => event.preventDefault()}
            onPointerMove={(event) => event.preventDefault()}
          >
            All Tasks
          </DropdownMenuItem>
          {listItems.length ? listItems : null}
        </DropdownMenuGroup>
        {listItems.length <= 6 ? (
          <>
            <DropdownMenuSeparator />
            <CategoryAdder onSelect={onSelect} />
          </>
        ) : (
          <div className='p-2 bg-inputBar'>
            <p className='text-xs font-semibold'>Max Categories Reached</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
