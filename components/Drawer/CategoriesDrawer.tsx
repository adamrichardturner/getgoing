'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LeagueSpartan } from '@/app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { User } from '@/types/User'

interface CategoriesDrawerProps {
  user: User | null
}

export default function CategoriesDrawer({ user }: CategoriesDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

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
  // Animation variants
  const variants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        className="absolute top-20 w-4 h-4 left-2.5 text-primary dark:text-white items-center justify-center"
        onClick={toggleDrawer}
      />
      <motion.aside
        id="sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
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
                  className="pt-3 pb-1 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                >
                  <h1
                    className={`${LeagueSpartan.className} text-xl font-semibold`}
                  >
                    GetGoing
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <ul className="space-y-2 text-sm font-medium"></ul>
          <div className="mt-auto flex">
            <div className="flex w-full justify-between">
              <span className="text-xs font-medium text-black dark:text-white">
                {user?.email}
              </span>
              <FontAwesomeIcon
                icon={faBars}
                className="md:hidden w-4 h-4 left-2.5 text-primary dark:text-white items-center justify-center"
                onClick={toggleDrawer}
              />
            </div>
          </div>
          {/* ... rest of your component */}
        </div>
      </motion.aside>
    </>
  )
}
