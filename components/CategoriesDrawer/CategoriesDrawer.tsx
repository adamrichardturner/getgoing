'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import useCategories from '@/hooks/categories'
import useTodos from '@/hooks/todos'
import { Category } from '@/types/Category'
import useMyTheme from '@/hooks/theme'
import DisableBodyScroll from '../DisableBodyScroll'

const CategoriesDrawer: React.FC = () => {
  if (typeof window === 'undefined') return null

  const date = new Date()
  const { loadCategories, categories, updateCategoryChosen, selectedCategory } =
    useCategories()
  const { filterByCategory, todos } = useTodos()
  const { smallScreen, isDrawerOpen, updateDrawerOpen } = useMyTheme()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true)
      loadCategories()
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const variants = {
    open: { width: '16rem', left: 0, zIndex: 6, height: '100%' },
    closed: { width: '16rem', left: '-16rem', zIndex: 6, height: '100%' },
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
    categories.slice(0, 7).map((category: Category) => {
      if (!category.id) return null
      return (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={
            selectedCategory === category.id
              ? 'flex flex-row justify-between px-4 bg-itemHover hover:bg-itemHover py-3 rounded cursor-pointer text-primary text-md font-semibold'
              : 'flex flex-row justify-between px-4 hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md font-normal hover:text-primary'
          }
        >
          <div className='space-x-2 flex flex-row items-center'>
            {selectedCategory === category.id ? (
              <FontAwesomeIcon
                icon={fasCircle}
                style={{ color: 'var(--highlight)' }}
              />
            ) : (
              <FontAwesomeIcon icon={farCircle} />
            )}
            <span className='leading-tight text-high-contrast'>
              {category.name}
            </span>
          </div>

          <span>{filterByCategory(todos, category.id).length}</span>
        </div>
      )
    })

  return (
    <>
      {isDrawerOpen && smallScreen && (
        <>
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-6'
            onClick={handleBackdropClick}
          ></div>
          <DisableBodyScroll />
        </>
      )}
      <motion.div
        id='sidebar'
        className='bg-drawer overflow-hidden fixed h-screen z-6 shadow-md'
        variants={variants}
        initial={smallScreen ? 'closed' : 'open'}
        animate={isDrawerOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      >
        {isLoading ? (
          <div className='flex w-full min-h-screen flex-col overflow-y-auto bg-drawer pb-4 pt-catTop'>
            {'Placeholder for loading animation or skeleton loader'}
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
                    ? 'flex flex-row justify-between mt-2.5 px-4 bg-itemHover hover:bg-itemHover py-3 rounded cursor-pointer text-primary text-md w-full font-semibold'
                    : 'flex flex-row justify-between mt-2.5 px-4 hover:bg-itemHover py-3 rounded cursor-pointer text-bodyText text-md w-full font-regular hover:text-primary'
                }
              >
                <div className='space-x-2 flex flex-row items-center'>
                  {selectedCategory === 999 ? (
                    <FontAwesomeIcon
                      icon={fasCircle}
                      style={{ color: 'var(--highlight)' }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={farCircle} />
                  )}
                  <span className='leading-tight text-high-contrast'>
                    All Tasks
                  </span>
                </div>
                <span>{todos.length}</span>
              </div>
              {renderCategories()}
            </div>
            <div className='mt-auto flex px-4'>
              <div className='flex flex-col w-full justify-between pb-2'>
                <span className='text-xxs text-left leading-1'>
                  © Copyright {date.getFullYear()} GetGoing
                </span>
                <a href='https://adamrichardturner.dev' target='_blank'>
                  <span className='text-xs font-semibold'>
                    Made by Adam Richard Turner
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default CategoriesDrawer
