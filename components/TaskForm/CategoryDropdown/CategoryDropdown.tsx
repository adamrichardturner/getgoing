'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/lib/hooks'
import { Category } from '@/types/Category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { CategoryAdder } from '../CategoryAdder/CategoryAdder'

export function CategoryDropdown(onSelect: any) {
  const categories: Category[] = useAppSelector(
    (state) => state.categories.items
  )

  const listItems = categories.map((category) => {
    // Assuming 'category' has a 'name' property you want to display
    return (
      <DropdownMenuItem key={category.id}>{category.name}</DropdownMenuItem>
    )
  })

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="ml-5 py-2 px-4 flex flex-row items-center h-9 rounded-md  border border-black dark:border-white hover:bg-accent">
          <p className="text-xs">Category</p>
          <FontAwesomeIcon
            icon={faLayerGroup}
            className="w-4 h-4 text-primary dark:text-white items-center justify-center"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border border-black dark:border-white">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            All Tasks
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          {listItems}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <CategoryAdder onSelect={onSelect} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
