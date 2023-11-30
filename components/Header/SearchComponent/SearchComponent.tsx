import { Input } from '@/components/ui/input'

export function SearchComponent() {
  return (
    <div className="hidden md:block">
      <Input type="search" placeholder="Search..." className="lg:w-[400px]" />
    </div>
  )
}
