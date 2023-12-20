'use client'

import { Input } from '@/components/ui/input'
import useTodos from '@/hooks/todos'

export function SearchComponent() {
  const { updateSearchTerm } = useTodos()

  return (
    <div className='hidden md:block bg-inputBar hover:bg-inputBarHover rounded-lg'>
      <Input
        type='search'
        placeholder='Search...'
        onChange={(e) => updateSearchTerm(e.target.value)}
        className='lg:w-[400px] cursor-pointer border border-white shadow-md rounded-lg bg-inputBar hover:bg-inputBarHover text-bodyText dark:text-white'
      />
    </div>
  )
}
