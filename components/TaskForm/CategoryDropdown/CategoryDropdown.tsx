'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
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

export function CategoryDropdown({
  onSelect,
  selectedCategory
}: CategoryDropdownProps) {
  const { categories } = useCategories()
  const [isHovering, setIsHovering] = useState(false)
  const handleCategoryClick = async (
    categoryId: number,
    categoryName: string
  ) => {
    onSelect(categoryName)
  }

  const listItems = categories.map((category) => {
    return (
      <DropdownMenuItem
        key={category.id}
        className={
          category.name == selectedCategory
            ? `text-bodyText cursor-pointer bg-inputBar hover:bg-itemHover`
            : `text-bodyText cursor-pointer bg-inputBar hover:bg-itemHover`
        }
        onClick={() => handleCategoryClick(category.id, category.name)}
        onPointerLeave={(event) => event.preventDefault()}
        onPointerMove={(event) => event.preventDefault()}
      >
        {category.name}
      </DropdownMenuItem>
    )
  })

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div
          className="hover:text-primary flex-none py-2 px-4 flex flex-row items-center justify-center w-9 h-9 sm:w-auto sm:h-auto rounded-md border border-itemBorder shadow hover:shadow-lg bg-inputBar hover:bg-inputBarHover"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span
            className={
              selectedCategory !== 'All Tasks' || isHovering
                ? `text-primary dark:text-white text-xs hidden sm:block pr-2`
                : 'text-btnOutline text-xs hidden sm:block pr-2 dark:text-white'
            }
          >
            {selectedCategory !== 'All Tasks'
              ? selectedCategory
              : 'Pick a Category'}
          </span>

          <FontAwesomeIcon
            icon={faLayerGroup}
            className={
              selectedCategory !== 'All Tasks' || isHovering
                ? `w-4 h-4 text-primary items-center justify-center dark:text-white`
                : `text-btnOutline w-4 h-4 items-center justify-center dark:text-white`
            }
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto shadow hover:shadow-lg text-right text-xs font-regular">
        <DropdownMenuLabel className="text-xs font-light">
          Pick a Category
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {listItems.length ? listItems : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <CategoryAdder
          onSelect={onSelect}
          selectedCategory={selectedCategory}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
