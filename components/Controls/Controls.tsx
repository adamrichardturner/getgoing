import { Filter } from './Filter/Filter'
import { Sorter } from './Sorter/Sorter'
import useCategories from '@/hooks/categories'
import { LeagueSpartan } from '@/app/fonts'

const Controls = () => {
  const { getCategoryNameById, selectedCategory } = useCategories()
  const category = getCategoryNameById(selectedCategory)
  return (
    <aside className="flex flex-row items-center justify-between space-x-3 pt-1">
      <div className="flex flex-row h-full items-center">
        <h2
          className={`${LeagueSpartan.className} ml-7 md:ml-0 text-md font-semibold text-primary`}
        >
          {category}
        </h2>
      </div>
      <div className="space-x-2">
        <Filter />
        <Sorter />
      </div>
    </aside>
  )
}

export default Controls
