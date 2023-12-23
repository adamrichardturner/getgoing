'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import useCategories from '@/hooks/categories'

interface CategoryAdderProps {
  onSelect: (category: string) => void
  isLoading: boolean
  editMode: boolean
}

export function CategoryAdder({
  onSelect,
  isLoading,
  editMode,
}: CategoryAdderProps) {
  const { createCategory, categories, loadCategories } = useCategories()
  const [newCategory, setNewCategory] = useState<string>('')

  const handleSubmit = () => {
    const addNewCategory = async () => {
      try {
        onSelect(newCategory)
        await createCategory(newCategory)
        toast({
          title: `${newCategory} category added.`,
        })
        loadCategories()
      } catch (error) {
        console.error(
          `Error regarding category ${newCategory} addition: ${error}`
        )
      }
    }
    addNewCategory()
  }

  return (
    <form onSubmit={handleSubmit} className='w-full px-2'>
      <Label>
        <h3 className='text-xs font-light py-1.5 text-bodyText'>
          {categories.length >= 7 ? (
            <span className='text-alert'>⚠️ Max Categories Reached</span>
          ) : (
            'Add a Category'
          )}
        </h3>
      </Label>
      <Input
        max={33}
        type='text'
        placeholder='New Category'
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className='w-full h-9 pt-0 my-0 py-0'
        disabled={categories.length >= 7 || editMode || isLoading}
      />
      <Button
        disabled={categories.length >= 7 || editMode || isLoading}
        type='button'
        onClick={handleSubmit}
        className='w-full h-9 ml-auto mt-2 flex flex-row space-x-2 bg-completed text-white dark:text-white'
      >
        <FontAwesomeIcon icon={faPlus} className='text-white' />
        <span>Add</span>
      </Button>
    </form>
  )
}
