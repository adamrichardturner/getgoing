'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import useCategories from '@/hooks/categories'

export function CategoryDrawerAdder({ handleEditModeToggle }: any) {
  const { createCategory, loadCategories } = useCategories()
  const [newCategory, setNewCategory] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const validateForm = (str: string) => {
    if (str.trim().length < 3) {
      setMessage(
        'Category name too short. The name must be 3 or more characters in length'
      )
      return false
    } else if (str.trim().length > 33) {
      setMessage(
        'Category name too long. The name must be less than 33 characters in length'
      )
      return false
    }
    return true
  }

  const handleSubmit = () => {
    const addNewCategory = async () => {
      try {
        setLoading(true)
        if (!validateForm(newCategory)) throw Error(message)
        const response = await createCategory(newCategory)
        toast({
          title: response.payload.message,
        })
        loadCategories()
      } catch (error) {
        console.error(error)
      } finally {
        setNewCategory('')
        setMessage('')
        setLoading(false)
        handleEditModeToggle()
      }
    }
    addNewCategory()
  }

  return (
    <>
      <div className='mb-2'>
        <p className='text-xs text-rose-500 leading-none'>{message}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full space-x-2 flex flex-row items-center'
      >
        <Input
          max={33}
          type='text'
          placeholder='New Category'
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className='flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[180px]'
          disabled={loading}
        />
        <Button
          disabled={
            loading || newCategory.length < 3 || newCategory.length > 33
          }
          type='button'
          onClick={handleSubmit}
          className='w-9 h-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow py-2 z-1 px-3 mr-2 ml-auto bg-btn ring-1 ring-high-contrast hover:shadow-lg hover:bg-darktask'
        >
          <FontAwesomeIcon icon={faPlus} className='text-high-contrast' />
        </Button>
      </form>
    </>
  )
}
