'use client'
import { LeagueSpartan } from '@/app/fonts'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { User } from '@/types/User'
import useCategories from '@/hooks/categories'
import { Category } from '@/types/Category'

interface CategoriesDrawerProps {
  user: User | null
}

const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({ user }) => {
  const { loadCategories, categories, updateCategoryChosen } = useCategories()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    // This function will only execute on the client side after mounting
    const handleResize = () => {
      setIsDrawerOpen(window.innerWidth >= 768)
    }

    // Set the initial state based on the client's window width
    handleResize()

    // Attach the event listener
    window.addEventListener('resize', handleResize)

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCategoryClick = (categoryId: number) => {
    updateCategoryChosen(categoryId)
  }

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const variants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  const renderCategories = () => {
    if (!categories) {
      return <li>Loading categories...</li>
    }

    const displayedCategories = isExpanded ? categories : categories.slice(0, 6)
    return displayedCategories.map((category: Category) => (
      <li
        key={category.id}
        onClick={() => handleCategoryClick(category.id)}
        className="py-3 pl-2 bg-task dark:bg-main rounded shadow-md mb-1 hover:dark-task cursor-pointer"
      >
        {category.name}
      </li>
    ))
  }

  return (
    <>
      <motion.aside
        id="sidebar"
        className="fixed left-0 top-0 z-5 h-screen w-64"
        aria-label="Sidebar"
        animate={isDrawerOpen ? 'open' : 'closed'}
        variants={variants}
        initial={false}
        transition={{ type: 'tween' }}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="absolute top-burgerTop cursor-pointer w-4 h-4 left-4 text-primary dark:text-white items-center justify-center"
          onClick={toggleDrawer}
        />
        <div className="relative flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 pb-4 pt-0 dark:border-slate-700 dark:bg-layout">
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
          <ul className="ml-0 mt-6 font-medium divide-y-2">
            <h2 className="text-right text-md text-btn">Categories</h2>
            <li
              key={999}
              onClick={() => handleCategoryClick(999)}
              className="py-3 pl-2 bg-slate-50 dark:bg-main rounded shadow-md mb-1 hover:bg-darktask cursor-pointer"
            >
              All Tasks
            </li>
          </ul>
          <div className="mt-auto flex">
            <div className="flex flex-col w-full justify-between">
              <h3 className="text-xs">Logged in as: </h3>
              <span className="text-xs font-medium text-black dark:text-white">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default CategoriesDrawer
