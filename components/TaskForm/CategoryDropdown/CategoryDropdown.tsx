'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  selectedCategory: string
}

export function CategoryDropdown({ onSelect }: CategoryDropdownProps) {
  const {
    categories,
    selectedCategory,
    updateCategoryChosen,
    getCategoryNameById,
  } = useCategories()
  const [isHovering, setIsHovering] = useState(false)
  const handleCategoryClick = async (categoryId: number) => {
    updateCategoryChosen(categoryId)
  }

  const listItems = categories
    .map((category) => {
      return (
        <DropdownMenuItem
          key={category.id}
          className={
            category.id == selectedCategory
              ? `text-bodyText cursor-pointer bg-inputBar hover:bg-itemHover`
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
          className='hover:text-primary flex-none py-2 px-4 flex flex-row items-center justify-center w-9 h-9 sm:w-auto sm:h-auto rounded-md border border-itemBorder shadow hover:shadow-lg bg-inputBar hover:bg-inputBarHover'
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span
            className={
              selectedCategory !== 999 || isHovering
                ? `text-primary dark:text-white text-xs hidden sm:block pr-2`
                : 'text-btnOutline text-xs hidden sm:block pr-2 dark:text-white'
            }
          >
            {getCategoryNameById(selectedCategory)}
          </span>

          <FontAwesomeIcon
            icon={faLayerGroup}
            className={
              selectedCategory !== 999 || isHovering
                ? `w-4 h-4 text-primary items-center justify-center dark:text-white`
                : `text-btnOutline w-4 h-4 items-center justify-center dark:text-white`
            }
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-auto shadow hover:shadow-lg text-right text-xs font-regular'>
        <DropdownMenuLabel className='text-xs font-light'>
          Pick a Category
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            key={999}
            className={
              999 == selectedCategory
                ? `text-bodyText cursor-pointer bg-inputBar hover:bg-itemHover`
                : `text-bodyText cursor-pointer bg-inputBar hover:bg-itemHover`
            }
            onClick={() => handleCategoryClick(999)}
            onPointerLeave={(event) => event.preventDefault()}
            onPointerMove={(event) => event.preventDefault()}
          >
            All Tasks
          </DropdownMenuItem>
          {listItems.length ? listItems : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <CategoryAdder onSelect={onSelect} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
