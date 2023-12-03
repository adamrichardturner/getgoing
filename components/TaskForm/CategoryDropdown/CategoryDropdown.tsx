'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/lib/hooks'
import { Category } from '@/types/Category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { CategoryAdder } from '../CategoryAdder/CategoryAdder'

interface CategoryDropdownProps {
  onSelect: (category: string) => void
  selectedCategory: string
}

export function CategoryDropdown({
  onSelect,
  selectedCategory
}: CategoryDropdownProps) {
  const handleCategorySelection = (category: string) => {
    onSelect(category)
  }

  const categories: Category[] = useAppSelector(
    (state) => state.categories.items
  )

  const listItems = categories.map((category) => {
    return (
      <DropdownMenuItem
        key={category.id}
        className="cursor-pointer"
        onClick={() => handleCategorySelection(category.name)}
      >
        {category.name}
      </DropdownMenuItem>
    )
  })

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex-none py-2 px-4 flex flex-row items-center justify-center w-9 h-9 sm:w-auto sm:h-auto rounded-md border border-itemBorder shadow hover:shadow-lg hover:bg-accent">
          <p className="text-xs hidden sm:block pr-2 text-btnOutline">
            Category
          </p>
          <FontAwesomeIcon
            icon={faLayerGroup}
            className="w-4 h-4 text-btnOutline items-center justify-center"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border border-black dark:border-white">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleCategorySelection('All Tasks')}
          >
            All Tasks
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          {listItems}
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
