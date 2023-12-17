import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { User } from '@/types/User'
import useCategories from '@/hooks/categories'
import useTodos from '@/hooks/todos'
import { Category } from '@/types/Category'
import useMyTheme from '@/hooks/theme'

interface CategoriesDrawerProps {
  user: User | null
}

const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({ user }) => {
  if (typeof window === 'undefined') return null
  const { loadCategories, categories, updateCategoryChosen, selectedCategory } =
    useCategories()
  const { filterByCategory, todos } = useTodos()
  const { smallScreen, isDrawerOpen, updateDrawerOpen } = useMyTheme()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await loadCategories()
      setIsLoading(false)
    }
    fetchData()
  }, [loadCategories])

  const variants = {
    open: { width: '16rem', left: 0, zIndex: 6, height: '100%' },
    closed: { left: '-16rem' },
  }

  const handleBackdropClick = () => updateDrawerOpen(false)
  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
    if (smallScreen) updateDrawerOpen(false)
  }

  const handleDrawer = () => {
    isDrawerOpen ? updateDrawerOpen(false) : updateDrawerOpen(true)
  }

  const renderCategories = () =>
    categories.slice(0, 7).map((category: Category) => (
      <div
        key={category.id}
        onClick={() => handleCategoryClick(category.id)}
        className={
          selectedCategory === category.id
            ? 'flex flex-row justify-between px-4 bg-itemHover hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md font-semibold hover:text-primary'
            : 'flex flex-row justify-between px-4 hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md font-normal hover:text-primary'
        }
      >
        <span className='leading-tight'>{category.name}</span>
        <span>{filterByCategory(todos, category.id).length}</span>
      </div>
    ))

  return (
    <>
      {isDrawerOpen && smallScreen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-5'
          onClick={handleBackdropClick}
        ></div>
      )}
      <motion.div
        id='sidebar'
        className='bg-drawer overflow-hidden fixed h-screen z-6 shadow-md'
        variants={variants}
        initial={'open'}
        animate={isDrawerOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      >
        {isLoading ? (
          <div className='flex w-full min-h-screen flex-col overflow-y-auto bg-drawer pb-4 pt-catTop'>
            {/* Replace with actual skeleton loader */}
            <div>Loading...</div>
          </div>
        ) : (
          <div className='flex w-full min-h-screen flex-col overflow-y-auto bg-drawer pb-4 pt-catTop'>
            <div className='font-medium'>
              <button
                className='relative bottom-burgerBottom cursor-pointer px-4 icon-fade'
                onClick={() => handleDrawer()}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <div
                key={999}
                onClick={() => handleCategoryClick(999)}
                className={
                  selectedCategory === 999
                    ? 'flex flex-row justify-between px-4 bg-itemHover hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md w-full font-semibold hover:text-primary'
                    : 'flex flex-row justify-between px-4 hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md w-full font-regular hover:text-primary'
                }
              >
                <span>All Tasks</span>
                <span>{todos.length}</span>
              </div>
              {renderCategories()}
            </div>
            <div className='mt-auto flex px-4'>
              <div className='flex flex-col w-full justify-between pb-2'>
                <h3 className='text-xxs'>Logged in as: </h3>
                <span className='text-xs font-medium text-black dark:text-white'>
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default CategoriesDrawer
