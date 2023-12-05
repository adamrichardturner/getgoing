import { Filter } from './Filter/Filter'
import { Sorter } from './Sorter/Sorter'
import useCategories from '@/hooks/categories'

const Controls = () => {
  const { selectedCategory } = useCategories()
  return (
    <aside className="flex flex-row justify-end space-x-3 pt-1">
      <div>
        <h2>{selectedCategory}</h2>
      </div>
      <div>
        <Filter />
        <Sorter />
      </div>
    </aside>
  )
}

export default Controls
