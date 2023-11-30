import { Input } from '@/components/ui/input'

export function SearchComponent() {
  return (
    <div className="hidden md:block outline outline-1 outline-white rounded">
      <Input type="search" placeholder="Search..." className="lg:w-[400px]" />
    </div>
  )
}
