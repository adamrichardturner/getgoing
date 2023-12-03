'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faBell, faPalette } from '@fortawesome/free-solid-svg-icons'
import { Category } from '@/types/Category'
import { useAppSelector } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import LoadingAnimation from '@/common/LoadingAnimation/LoadingAnimation'
import { motion } from 'framer-motion'

// Define the animation variants
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const Task = ({ todo }: any) => {
  const categories = useAppSelector((state) => state.categories.items)
  const category = getNameFromId(todo.category_id, categories)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [todo])

  // Helper functions
  function getNameFromId(id: number, array: Category[]): string | null {
    const item = array.find((obj) => obj.id === id)
    return item ? item.name : null
  }

  function truncateString(str: string): string {
    const maxLength = 120
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...'
    } else {
      return str
    }
  }

  // Return the loading animation if the data is still loading
  if (isLoading) {
    return <LoadingAnimation />
  }

  // Once the data has loaded, return the task content
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <article className="bg-task hover:bg-darktask w-full flex flex-row justify-between shadow-sm hover:shadow-md cursor-pointer rounded-lg py-5 pl-3 pr-3">
        <div className="flex flex-row items-center space-x-2">
          <div>
            <FontAwesomeIcon icon={faCircle} className="text-slate-400" />
          </div>
          <div className="flex flex-col text-bodyText">
            <div>
              <p className="text-xs xs:text-xs sm:text-sm md:text-md font-medium">
                {truncateString(todo.content)}
              </p>
            </div>
            <div className="flex flex-row text-xs space-x-2">
              <div className="font-regular text-xs xs:text-xs sm:text-xs md:text-md">
                {category}
              </div>
              {todo.due_date && (
                <div className="flex flex-row space-x-1">
                  <span>
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <p className="text-xs xs:text-xs sm:text-xs md:text-md">
                    Due {todo.due_date}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={'flex items-center'}>
          <div>
            <FontAwesomeIcon
              icon={faPalette}
              className={`text-color-[${todo.color}]`}
            />
          </div>
        </div>
      </article>
    </motion.div>
  )
}

export default Task
