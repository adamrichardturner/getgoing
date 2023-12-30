'use client'

import { Filter } from './Filter/Filter'
import { Sorter } from './Sorter/Sorter'
import useCategories from '@/hooks/categories'
import useControl from '@/hooks/control'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MdClose } from 'react-icons/md'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
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
    toggleAscending,
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
    changeFilter('')
    changeColor('')
    changeCompleted(false)
    changeSort('')
    changeAscending(true)
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
      case '':
        return ''
      default:
        return option.charAt(0).toUpperCase() + option.slice(1)
    }
  }

  return (
    <>
      <aside
        className={`mt-0 pt-0 font-light min-h-[4rem] flex flex-row items-start justify-between space-x-3 max-w-auto
        }`}
      >
        <div className='flex flex-row justify-start items-start flex-1'>
          <div className='mr-auto'>
            {!isDrawerOpen && (
              <button
                className='cursor-pointer text-xl icon-fade mt-0 text-bodyText'
                onClick={toggleDrawer}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-end space-y-2'>
          <div className='flex flex-row space-x-4 items-end justify-end'>
            <Filter />
            <Sorter />
          </div>
        </div>
      </aside>
      <section className='flex flex-row justify-between'>
        {' '}
        <div className='flex flex-row items-end justify-end md:max-w-auto'>
          <h2
            className={`pt-0 mt-0 text-xl font-regular leading-none text-high-contrast`}
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
        <div className='flex flex-row space-x-2 items-center'>
          {(filterOption || sortOption) && (
            <div className='flex flex-row items-end space-x-1'>
              <button onClick={toggleAscending} className='space-x-1 items-end'>
                {selectedAscending ? <BiChevronUp /> : <BiChevronDown />}
              </button>
            </div>
          )}
          {selectedColor !== '' && (
            <div className='flex flex-row items-center'>
              <span
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: selectedColor }}
              ></span>
            </div>
          )}
          {filterOption !== '' && (
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
          {sortOption !== '' && (
            <div className='flex flex-row items-center'>
              <span className='text-xxs text-subtext'>
                Sort:{' '}
                <span className='font-semibold'>
                  {formatFilterOption(sortOption)}
                </span>
              </span>
            </div>
          )}
          {(filterOption || sortOption) && (
            <div className='flex flex-row items-center justify-end space-x-2 text-right h-4'>
              <button onClick={onReset} className='flex items-center space-x-1'>
                <MdClose />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Controls
