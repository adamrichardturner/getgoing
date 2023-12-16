'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCategories from '@/hooks/categories'

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
})

type CategorySelectProps = {
  handleNewCategory: (categoryId: number) => void
  category: string
  newCategory: number
}

export function CategorySelect({
  handleNewCategory,
  category,
  newCategory,
}: CategorySelectProps) {
  const selectedCategory = category
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { categories } = useCategories()

  return (
    <Form {...form}>
      <form className='mt-0 w-full'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <Select
                name='catDropdown'
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className='mt-0 w-full outline-0 ring-0 rounded-md border-0 border-itemBorder shadow hover:shadow-lg bg-inputBar hover:bg-inputBarHover'>
                    <SelectValue
                      placeholder='Change Category'
                      className='border-0 outline-0'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={String(category.id)}
                      onClick={() => handleNewCategory(category.id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
