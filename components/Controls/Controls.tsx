import { Filter } from './Filter/Filter'
import { Sorter } from './Sorter/Sorter'
import useCategories from '@/hooks/categories'
import { LeagueSpartan } from '@/app/fonts'
import useControl from '@/hooks/control'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsSpin, faBars } from '@fortawesome/free-solid-svg-icons'
import useMyTheme from '@/hooks/theme'

const Controls = () => {
  const { switchDrawerOpen, isDrawerOpen } = useMyTheme()
  const { changeFilter, changeColor, changeCompleted, changeSort } =
    useControl()
  const { getCategoryNameById, selectedCategory } = useCategories()
  const category = getCategoryNameById(selectedCategory)

  const onReset = () => {
    changeFilter('none')
    changeColor('#2464CF')
    changeCompleted(false)
    changeSort('default')
  }

  const toggleDrawer = () => {
    switchDrawerOpen()
  }

  return (
    <aside className="flex flex-row items-center justify-between space-x-3 pt-1">
      <div className="flex flex-row h-full items-center space-x-2 justify-center">
        {!isDrawerOpen && (
          <button className="cursor-pointer icon-fade" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        <h2
          className={`${LeagueSpartan.className} ml-2 md:ml-0 pt-1 text-lg font-semibold leading-none text-highlight`}
        >
          {category}
        </h2>
      </div>
      <div className="flex flex-col items-end justify-end space-y-1">
        <div className="flex flex-row space-x-2 items-center">
          <Filter />
          <Sorter />
        </div>
        <div className="flex flex-row items-center justify-end">
          <button onClick={onReset} className="flex items-center space-x-1">
            <FontAwesomeIcon icon={faArrowsSpin} className="text-slate-400" />
            <span className="text-xxs text-slate-400">Reset</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Controls
