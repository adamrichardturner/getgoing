'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
  selectedCategory: string
}

const FormSchema = z.object({
  category: z.string().min(2, {
    message: 'Category must be at least 2 characters.'
  })
})

export function CategoryAdder({
  onSelect,
  selectedCategory
}: CategoryAdderProps) {
  const { createCategory } = useCategories()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: ''
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    const addNewCategory = async () => {
      try {
        onSelect(data.category)
        await createCategory(data.category)
      } catch (error) {
        console.error(
          `Error regarding category ${data.category} addition: ${error}`
        )
      }
    }

    addNewCategory()

    toast({
      title: `${data.category} category added.`
    })

    form.reset()
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col items-end">
              <Label>
                <h3 className="text-xs font-regular">Add a Category</h3>
              </Label>
              <Input
                type="text"
                placeholder="New Category"
                {...field}
                className="w-full h-9"
              />
              <Button
                type="submit"
                className="w-full h-9 mt-0 flex flex-row space-x-2 bg-btn text-white dark:text-white"
              >
                <FontAwesomeIcon icon={faPlus} className="text-white" />
                <span>Add</span>
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
