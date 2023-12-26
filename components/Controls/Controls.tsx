'use client'

import { Filter } from './Filter/Filter'
import { Sorter } from './Sorter/Sorter'
import useCategories from '@/hooks/categories'
import { LeagueSpartan } from '@/app/fonts'
import useControl from '@/hooks/control'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRotateRight,
  faBars,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import useMyTheme from '@/hooks/theme'
import useTodos from '@/hooks/todos'

const Controls = () => {
  const { switchDrawerOpen, isDrawerOpen } = useMyTheme()
  const {
    changeFilter,
    changeColor,
    changeCompleted,
    changeSort,
    changeAscending,
    filterOption,
    sortOption,
    selectedColor,
    selectedCompletion,
    selectedAscending,
  } = useControl()
  const { getCategoryNameById, selectedCategory } = useCategories()
  const { searchTerm, updateSearchTerm } = useTodos()
  const category = getCategoryNameById(selectedCategory)

  const onReset = () => {
    changeFilter('none')
    changeColor('')
    changeCompleted(false)
    changeSort('none')
  }

  const toggleDrawer = () => {
    switchDrawerOpen()
  }

  const formatFilterOption = (option: string) => {
    switch (option) {
      case 'not_completed':
        return 'Not Completed'
      case 'completed':
        return 'Completed'
      case 'dueDate':
        return 'Due'
      case 'creationDate':
        return 'Creation'
      case 'updatedDate':
        return 'Last Updated'
      case 'alpha':
        return 'Alphabetically'
      case 'none':
        return ''
      default:
        return option.charAt(0).toUpperCase() + option.slice(1)
    }
  }

  return (
    <>
      {!isDrawerOpen && (
        <button
          className='cursor-pointer text-xl icon-fade mt-0 text-bodyText'
          onClick={toggleDrawer}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <aside className='mt-0 pt-0 font-light min-h-[4rem] flex flex-row items-end justify-end space-x-3'>
        <div className='flex flex-col items-end justify-end space-y-1 max-w-[100%]'>
          <div className='flex flex-row items-center justify-end space-x-2 text-right h-4'>
            {selectedColor !== '' && (
              <div className='flex flex-row items-center'>
                <span
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: selectedColor }}
                ></span>
              </div>
            )}
            {filterOption !== 'none' && (
              <div className='flex flex-row space-x-2 items-center'>
                <span className='text-xxs text-subtext'>
                  Filter:{' '}
                  <span className='font-semibold'>
                    {formatFilterOption(filterOption)}
                  </span>
                </span>
              </div>
            )}
            {selectedCompletion && (
              <div className='flex flex-row items-center'>
                <span className='text-xxs text-subtext'>
                  Status:{' '}
                  <span className='font-semibold'>
                    {selectedCompletion ? 'Completed' : 'Not Completed'}
                  </span>
                </span>
              </div>
            )}
            {sortOption !== 'none' && (
              <div className='flex flex-row items-center'>
                <span className='text-xxs text-subtext'>
                  Sort:{' '}
                  <span className='font-semibold'>
                    {formatFilterOption(sortOption)}
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className='flex flex-row space-x-2 items-center'>
            <div className='flex flex-row items-center space-x-1'>
              {selectedAscending ? (
                <button
                  onClick={() => changeAscending(false)}
                  className='space-x-1'
                >
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className='w-4 h-4 sm:w-5 sm:h-5 text-highlight'
                  />
                  <span className='text-xs sm:text-sm text-highlight'>
                    Order
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => changeAscending(true)}
                  className='space-x-1'
                >
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className='w-4 h-4 sm:w-5 sm:h-5 text-highlight'
                  />
                  <span className='text-xs sm:text-sm text-highlight'>
                    Order
                  </span>
                </button>
              )}
            </div>
            <Filter />
            <Sorter />
          </div>

          <div className='flex flex-row items-center text-sm space-x-2 pt-3'>
            <div>
              <button onClick={onReset} className='flex items-center space-x-1'>
                <FontAwesomeIcon
                  icon={faRotateRight}
                  className='text-btnOutline dark:text-white'
                />
                <span className='text-xxs text-btnOutline dark:text-white'>
                  Reset
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      <section className='main-wrapper flex flex-row justify-start'>
        {' '}
        <div className='flex flex-row items-end justify-end md:max-w-auto'>
          <h2
            className={`${LeagueSpartan.className} ml-2 md:ml-0 pt-1 text-2xl xs:text-3xl font-light leading-none text-high-contrast`}
          >
            {searchTerm ? 'Search Results' : category}
          </h2>
          {searchTerm && (
            <button
              onClick={() => updateSearchTerm('')}
              className='flex items-center space-x-1'
            >
              <FontAwesomeIcon
                icon={faRotateRight}
                className='w-2 h-2 sm:w-3 ml-2 sm:h-3 text-highlight dark:text-white'
              />
              <span className='text-xs sm:text-sm text-highlight font-light dark:text-white'>
                Reset
              </span>
            </button>
          )}
        </div>
      </section>
    </>
  )
}

export default Controls
