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
    changeSmallScreen,
    isDrawerOpen,
    updateDrawerOpen,
    switchDrawerOpen
  } = useMyTheme()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const renderScreen = async () => {
      await loadCategories()
      await renderCategories()
    }
    renderScreen()
  }, [])

  const drawerWidth = '16rem' // Adjust the width as needed

  const variants = {
    open: { width: drawerWidth, left: 0, zIndex: 6, height: '100%' },
    closed: { width: '0', left: '-16rem' }
  }

  useEffect(() => {
    if (screenWidth <= 800) {
      updateDrawerOpen(false)
    }
    const handleResize = () => {
      const newWidth = window.innerWidth
      setScreenWidth(newWidth)
      changeSmallScreen(newWidth <= 800)
      if (newWidth > 800) {
        updateDrawerOpen(true)
      } else {
        updateDrawerOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Set initial state

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
            ? `flex flex-row justify-between px-4 bg-itemHover hover:bg-itemHover py-3 rounded mb-1 cursor-pointer text-bodyText text-sm font-semibold hover:text-primary`
            : `flex flex-row justify-between px-4 hover:bg-itemHover py-3 rounded mb-1 cursor-pointer text-bodyText text-sm font-normal hover:text-primary`
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
        className={`flex-shrink-0 bg-drawer overflow-hidden min-h-screen ${
          screenWidth > 800 ? 'fixed' : 'absolute'
        } left-0 z-6`}
        variants={variants}
        animate={isDrawerOpen ? 'open' : 'closed'}
        initial="closed"
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
      >
        <div className="flex h-full flex-col overflow-y-auto border-r bg-drawer px-4 pb-4 pt-catTop">
          <div className="font-medium">
            <div>
              <button
                className="relative bottom-burgerBottom cursor-pointer icon-fade"
                onClick={toggleDrawer}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>

              <div
                key={999}
                onClick={() => handleCategoryClick(999)}
                className={
                  selectedCategory == 999
                    ? `flex flex-row justify-between px-4 bg-itemHover hover:bg-itemHover py-3 rounded mb-1 cursor-pointer text-bodyText text-sm font-semibold hover:text-primary`
                    : `flex flex-row justify-between px-4 hover:bg-itemHover py-3 rounded mb-1 cursor-pointer text-bodyText text-sm font-regular hover:text-primary`
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
