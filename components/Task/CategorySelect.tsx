'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import useCategories from '@/hooks/categories'

type CategorySelectProps = {
  handleNewCategory: (categoryId: number) => void
  id: number
}

export function CategorySelect({ handleNewCategory, id }: CategorySelectProps) {
  const { categories, getCategoryNameById } = useCategories()
  const placeholder = id ? getCategoryNameById(id) : 'Select a Category'
  return (
    <Select>
      <SelectTrigger className='w-full flex h-9 rounded-md px-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 py-2 border border-itemBorder shadow hover:shadow-lg bg-inputBar hover:bg-inputBarHover'>
        <SelectValue
          placeholder={placeholder}
          className='flex h-9 w-full rounded-md px-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 py-2 border border-itemBorder shadow hover:shadow-lg bg-inputBar hover:bg-inputBarHover'
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            key='default'
            value='All Tasks'
            onClick={() => handleNewCategory(999)}
            className='cursor-pointer'
          >
            All Tasks
          </SelectItem>
          {categories &&
            categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.name}
                onClick={() => handleNewCategory(category.id)}
                className='cursor-pointer'
              >
                {category.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
