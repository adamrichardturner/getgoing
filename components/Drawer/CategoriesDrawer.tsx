'use client'
import { LeagueSpartan } from '@/app/fonts'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { User } from '@/types/User'
import useCategories from '@/hooks/categories'
import useTodos from '@/hooks/todos'
import { Category } from '@/types/Category'

interface CategoriesDrawerProps {
  user: User | null
}

const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({ user }) => {
  const { loadCategories, categories, updateCategoryChosen, selectedCategory } =
    useCategories()
  const { filterByCategory, todos } = useTodos()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    const renderScreen = async () => {
      await loadCategories()
      await renderCategories()
    }
    renderScreen()
  }, [])

  useEffect(() => {
    // Set initial state based on window width
    setIsDrawerOpen(window.innerWidth >= 800)

    const handleResize = () => {
      setIsDrawerOpen(window.innerWidth >= 800)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState)
  }

  const variants = {
    open: {
      x: 0,
      transition: { duration: 0.5, ease: 'easeInOut', type: 'tween' }
    },
    closed: {
      x: '-100%',
      transition: { duration: 0.5, ease: 'easeInOut', type: 'tween' }
    }
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
            ? `flex flex-row justify-between px-4 bg-darktask hover:bg-darktask py-3 rounded shadow-md mb-1 cursor-pointer text-btnOutline text-sm font-normal hover:text-primary`
            : `flex flex-row justify-between px-4 bg-task hover:bg-darktask py-3 rounded shadow-md mb-1 cursor-pointer text-btnOutline text-sm font-normal hover:text-primary`
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
      <button
        className="absolute md:hidden top-burgerTop left-4 cursor-pointer text-primary dark:text-white"
        onClick={toggleDrawer}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
      </button>
      <motion.div
        id="sidebar"
        className="fixed left-0 top-0 z-5 h-screen w-64 bg-white dark:bg-layout"
        animate={isDrawerOpen ? 'open' : 'closed'}
        variants={variants}
        initial={false}
      >
        <div className="relative flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 pb-4 pt-0 dark:border-slate-700 dark:bg-layout">
          <div className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-900 dark:text-white">
            <div className="flex flex-col items-center justify-between">
              <div className="flex flex-row items-center">
                <Link
                  href="/"
                  className="pl-0 pt-3 pb-1 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                >
                  <h1
                    className={`${LeagueSpartan.className} z-20 text-xl font-semibold`}
                  >
                    GetGoing
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div className="ml-0 mt-catTopMob md:mt-catTop font-medium">
            <button
              className="relative md:hidden cursor-pointer text-primary dark:text-white bottom-burgerCatMob"
              onClick={toggleDrawer}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
            </button>
            <div className="divide-y-2">
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
