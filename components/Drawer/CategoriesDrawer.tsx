'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LeagueSpartan } from '@/app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faPaperclip
} from '@fortawesome/free-solid-svg-icons'
import { User } from '@/types/User'
import useCategories from '@/hooks/categories'

interface CategoriesDrawerProps {
  user: User | null
}

export default function CategoriesDrawer({ user }: CategoriesDrawerProps) {
  const { loadCategories, categories } = useCategories()
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsDrawerOpen(false)
      } else {
        setIsDrawerOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)

    // Initial check
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Toggle Drawer Function
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Animation variants
  const variants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        className="absolute top-burgerTop cursor-pointer w-4 h-4 left-4 text-primary dark:text-white items-center justify-center"
        onClick={toggleDrawer}
      />
      <motion.aside
        id="sidebar"
        className="fixed left-0 top-0 z-5 h-screen w-64 transition-transform"
        aria-label="Sidebar"
        animate={isDrawerOpen ? 'open' : 'closed'}
        variants={variants}
        initial={false}
        transition={{ type: 'tween' }}
      >
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
          <ul className="ml-0 mt-6 text-sm font-medium divide-y-2">
            <div className="flex flex-row items-center justify-between mb-2">
              <div className="flex flex-col items-start h-full">
                <FontAwesomeIcon
                  icon={faBars}
                  className="cursor-pointer md:hidden w-4 h-4 left-2.5 text-primary dark:text-white items-center justify-center"
                  onClick={toggleDrawer}
                />
              </div>
              <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon
                  icon={faPaperclip}
                  className="w-4 h-4 text-primary dark:text-white items-center justify-center"
                />
                <h2 className="font-bold text-right">My Todos</h2>
              </div>
            </div>

            <li className="py-3 pl-2 bg-slate-50 dark:bg-main dark:hover:bg-darkest rounded shadow-md mb-1 hover:bg-slate-300 cursor-pointer border-t-0 border-t-transparent">
              <div className="flex flex-row items-center justify-start">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="w-4 h-4 leading-none text-primary dark:text-white items-center justify-center mr-2"
                />
                All Todos
              </div>
            </li>
            {categories.slice(0, 6).map((category) => (
              <li
                key={category.id}
                className="py-3 pl-2 bg-slate-50 dark:bg-main rounded shadow-md mb-1 hover:bg-slate-300 dark:hover:bg-darkest cursor-pointer"
              >
                <div className="flex flex-row items-center justify-start">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="w-4 h-4 leading-none text-primary dark:text-white items-center justify-center mr-2"
                  />
                  {category.name}
                </div>
              </li>
            ))}
            {categories.length > 6 && (
              <li className="cursor-pointer" onClick={toggleExpand}>
                {isExpanded ? 'Less Categories' : 'More Categories'}
                <FontAwesomeIcon
                  icon={isExpanded ? faChevronUp : faChevronDown}
                />
              </li>
            )}
            {isExpanded && (
              <div className="overflow-y-scroll max-h-48">
                <ul>
                  {categories.slice(6).map((category) => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </div>
            )}
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
