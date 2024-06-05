"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons"
import useCategories from "@/hooks/categories"

interface CategoryDropdownProps {
  onSelect: (category: string) => void
  catExpanded: boolean
  onExpand: any
}

export function CategoryDropdown({
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
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
    onExpand(true)
    setIsOpen(false)
  }

  const handleCloseDropdown = () => {
    if (isOpen) setIsOpen(false)
  }

  const listItems = categories.map((category) => {
    return (
      <div className="flex items-center justify-start py-0" key={category.id}>
        <DropdownMenuItem
          className={`${
            selectedCategory === category.id
              ? "bg-accent text-accent-foreground"
              : ""
          } ' w-full cursor-pointer hover:bg-accent-foreground transition-color px-3 py-2 text-xs flex flex-row items-center justify-start'`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </DropdownMenuItem>
      </div>
    )
  })

  return (
    <DropdownMenu modal open={isOpen} onOpenChange={handleCloseDropdown}>
      <DropdownMenuTrigger asChild>
        <div
          className={`${
            selectedCategory
              ? "w-8 h-8 px-3 space-x-1 py-0 sm:w-auto bg-inputBar text-primary border border-itemBorder hover:shadow-lg"
              : "w-8 h-8"
          } text-btnOutline px-3 hover:text-primary flex-none py-0 flex flex-row items-center justify-center rounded-md hover:border-1 hover:border hover:border-itemBorder hover:shadow-lg hover:bg-inputBar`}
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
              isHovering ? "text-primary text-xs" : "text-btnOutline text-xs"
            } ${
              catExpanded
                ? "hidden sm:block text-primary"
                : " text-btnOutline hidden"
            }`}
          >
            {getCategoryNameById(selectedCategory)}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-light mx-4 min-w-[60vw] xs:min-w-[200px] shadow hover:shadow-lg text-right text-xs py-2">
        <DropdownMenuGroup>
          <h3 className="text-left text-sm text-high-contrast font-regular pt-3 pb-2 px-3">
            Categories
          </h3>
          <DropdownMenuItem
            key={999}
            className={`text-bodyText py-2 px-3 cursor-pointer text-xs ${
              999 === selectedCategory
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => handleCategoryClick(999)}
            onPointerLeave={(event) => event.preventDefault()}
            onPointerMove={(event) => event.preventDefault()}
          >
            All Tasks
          </DropdownMenuItem>
          {listItems}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
