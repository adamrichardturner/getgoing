'use client'
import { Input } from '@/components/ui/input'
import useTodos from '@/hooks/todos'

export function SearchComponent() {
  const { updateSearchTerm } = useTodos()

  return (
    <div className="hidden md:block bg-inputBar hover:bg-inputBarHover rounded">
      <Input
        type="search"
        placeholder="Search..."
        onChange={(e) => updateSearchTerm(e.target.value)}
        className="lg:w-[400px] border border-white shadow-md rounded bg-inputBar hover:bg-inputBarHover text-primary dark:text-white"
      />
    </div>
  )
}
