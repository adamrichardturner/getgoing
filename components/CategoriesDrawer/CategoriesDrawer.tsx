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
  const { loadCategories, categories, updateCategoryChosen, selectedCategory } =
    useCategories()
  const { filterByCategory, todos } = useTodos()
  const {
    smallScreen,
    changeSmallScreen,
    isDrawerOpen,
    updateDrawerOpen,
    switchDrawerOpen
  } = useMyTheme()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    const renderScreen = async () => {
      await loadCategories()
      await renderCategories()
    }
    renderScreen()
  }, [])

  const drawerWidth = '16rem' // Adjust the width as needed

  const variants = {
    open: { width: drawerWidth },
    closed: { width: '0' }
  }

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth <= 800) {
        changeSmallScreen(window.innerWidth <= 800)
        updateDrawerOpen(!isDrawerOpen)
      } else {
        changeSmallScreen(window.innerWidth > 800)
        updateDrawerOpen(isDrawerOpen)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call it immediately to set the initial state

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
  }

  const toggleDrawer = () => {
    switchDrawerOpen()
  }

  const renderCategories = () => {
    if (!categories) {
      return <span>Loading categories</span>
    }

    const displayedCategories = isExpanded ? categories : categories.slice(0, 6)
    return displayedCategories.map((category: Category) => (
      <div
        key={category.id}
        onClick={() => handleCategoryClick(category.id)}
        className={
          selectedCategory == category.id
            ? `flex flex-row justify-between px-4 bg-darktask hover:bg-darktask py-3 rounded shadow mb-1 cursor-pointer text-btnOutline text-sm font-normal hover:text-primary`
            : `flex flex-row justify-between px-4 bg-task hover:bg-darktask py-3 rounded shadow mb-1 cursor-pointer text-btnOutline text-sm font-normal hover:text-primary`
        }
      >
        <span>{category.name}</span>
        <span>{filterByCategory(todos, category.id).length}</span>
      </div>
    ))
  }

  const categoriesToShow = renderCategories()

  return (
    <>
      <motion.div
        id="sidebar"
        className={
          'flex-shrink-0 bg-white dark:bg-layout overflow-hidden min-h-screen'
        }
        variants={variants}
        animate={isDrawerOpen ? 'open' : 'closed'}
        initial="closed"
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
      >
        <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 pb-4 pt-catTop dark:border-slate-700 dark:bg-layout">
          <div className="font-medium">
            <div className="divide-y-2">
              <button
                className="relative bottom-4 cursor-pointer icon-fade"
                onClick={toggleDrawer}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>

              <div
                key={999}
                onClick={() => handleCategoryClick(999)}
                className={
                  selectedCategory == 999
                    ? `flex flex-row justify-between px-4 bg-darktask hover:bg-darktask py-3 rounded shadow-md mb-1 cursor-pointer text-btnOutline text-sm text-regular hover:text-primary`
                    : `flex flex-row justify-between px-4 bg-task hover:bg-darktask py-3 rounded shadow-md mb-1 cursor-pointer text-btnOutline text-sm text-regular hover:text-primary`
                }
              >
                <span>All Tasks</span>
                <span>{todos.length}</span>
              </div>
              {categoriesToShow}
            </div>
          </div>
          <div className="mt-auto flex">
            <div className="flex flex-col w-full justify-between">
              <h3 className="text-xs">Logged in as: </h3>
              <span className="text-xs font-medium text-black dark:text-white">
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
