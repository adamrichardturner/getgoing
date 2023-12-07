import { Input } from '@/components/ui/input'

export function SearchComponent() {
  return (
    <div className="hidden md:block bg-inputBar hover:bg-inputBarHover rounded">
      <Input
        type="search"
        placeholder="Search..."
        className="lg:w-[400px] border border-white shadow-md rounded bg-inputBar hover:bg-inputBarHover text-primary dark:text-black"
      />
    </div>
  )
}
