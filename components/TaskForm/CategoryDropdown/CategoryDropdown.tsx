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
import { useEffect, useState } from 'react'

interface CategoryDropdownProps {
  onSelect: (category: string) => void
  selectedCategory: string
}

export function CategoryDropdown({
  onSelect,
  selectedCategory
}: CategoryDropdownProps) {
  const { categories, loadCategories, updateCategoryChosen } = useCategories()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    // This function will only execute on the client side after mounting
    const handleResize = () => {
      setIsDrawerOpen(window.innerWidth >= 768)
    }

    // Set the initial state based on the client's window width
    handleResize()

    // Attach the event listener
    window.addEventListener('resize', handleResize)

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
            ? `text-bodyText cursor-pointer bg-darktask hover:bg-darktask`
            : `text-bodyText cursor-pointer hover:bg-darktask`
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
        <div className="flex-none py-2 px-4 flex flex-row items-center justify-center w-9 h-9 sm:w-auto sm:h-auto rounded-md border border-itemBorder shadow hover:shadow-lg hover:bg-accent">
          <span
            className={
              selectedCategory !== 'All Tasks'
                ? `text-primary dark:text-white text-xs hidden sm:block pr-2`
                : 'text-btnOutline text-xs hidden sm:block pr-2'
            }
          >
            {selectedCategory.length > 0 ? selectedCategory : 'Pick a Category'}
          </span>
          <FontAwesomeIcon
            icon={faLayerGroup}
            className={
              selectedCategory !== 'All Tasks'
                ? `w-4 h-4 text-primary items-center justify-center`
                : `text-btnOutline w-4 h-4 items-center justify-center`
            }
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 shadow hover:shadow-lg ">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={
              'All Tasks' == selectedCategory
                ? `text-bodyText cursor-pointer bg-darktask hover:bg-darktask`
                : `text-bodyText cursor-pointer hover:bg-darktask`
            }
            onClick={() => handleCategoryClick(999, 'All Tasks')}
            onPointerLeave={(event) => event.preventDefault()}
            onPointerMove={(event) => event.preventDefault()}
          >
            All Tasks
          </DropdownMenuItem>
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
