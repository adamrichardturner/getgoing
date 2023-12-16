'use client'

import { useEffect, useState } from 'react'
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
  const {
    smallScreen,
    changeSmallScreen,
    isDrawerOpen,
    updateDrawerOpen,
    switchDrawerOpen,
  } = useMyTheme()

  useEffect(() => {
    const renderScreen = async () => {
      loadCategories()
      renderCategories()
    }
    renderScreen()
  }, [])

  const drawerWidth = '16rem'

  const variants = {
    open: { width: drawerWidth, left: 0, zIndex: 6, height: '100%' },
    closed: { left: '-16rem' },
  }

  useEffect(() => {
    // Function to handle screen resize and update drawer state
    const handleResize = () => {
      const screenWidth = window.innerWidth

      // Set initial state based on screen width
      const isSmallScreen = screenWidth < 800
      changeSmallScreen(isSmallScreen)
      updateDrawerOpen(!isSmallScreen)
    }

    handleResize()

    // Set up event listener for screen resize
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleBackdropClick = () => {
    switchDrawerOpen()
  }

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
    if (smallScreen) {
      switchDrawerOpen()
    }
  }

  const toggleDrawer = () => {
    switchDrawerOpen()
  }

  const renderCategories = () => {
    const displayedCategories = categories.slice(0, 7)
    return displayedCategories.map((category: Category) => (
      <div
        key={category.id}
        onClick={() => handleCategoryClick(category.id)}
        className={
          selectedCategory == category.id
            ? `flex flex-row justify-between px-4 bg-itemHover hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md font-semibold hover:text-primary`
            : `flex flex-row justify-between px-4 hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md font-normal hover:text-primary`
        }
      >
        <span className='leading-tight'>{category.name}</span>
        <span>{filterByCategory(todos, category.id).length}</span>
      </div>
    ))
  }

  const categoriesToShow = renderCategories()

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
        className={`flex-shrink-0 bg-drawer overflow-hidden fixed h-screen left-0 z-6 shadow-md`}
        variants={variants}
        animate={isDrawerOpen ? 'open' : 'closed'}
        initial={isDrawerOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      >
        <div className='flex min-h-screen flex-col overflow-y-auto bg-drawer pb-4 pt-catTop'>
          <div className='font-medium'>
            <div>
              <button
                className='relative bottom-burgerBottom cursor-pointer px-4 icon-fade'
                onClick={toggleDrawer}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>

              <div
                key={999}
                onClick={() => handleCategoryClick(999)}
                className={
                  selectedCategory == 999
                    ? `flex flex-row justify-between px-4 bg-itemHover hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md w-full font-semibold hover:text-primary`
                    : `flex flex-row justify-between px-4 hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md w-full font-regular hover:text-primary`
                }
              >
                <span>All Tasks</span>
                <span>{todos.length}</span>
              </div>
              {categoriesToShow}
            </div>
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
      </motion.div>
    </>
  )
}

export default CategoriesDrawer
