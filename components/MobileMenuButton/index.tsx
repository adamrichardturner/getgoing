'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import useMyTheme from '@/hooks/theme'
import { motion, AnimatePresence } from 'framer-motion'
const MobileMenuButton = () => {
  const { switchDrawerOpen, isDrawerOpen } = useMyTheme()

  const toggleDrawer = () => {
    switchDrawerOpen()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed z-50 left-4 bottom-1/4'
      >
        {!isDrawerOpen && (
          <button
            className='md:hidden z-50 transition-transform cursor-pointer bg-header dark:bg-white text-white dark:text-darkest w-10 shadow-lg h-10 rounded-full text-xl'
            onClick={() => toggleDrawer()}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default MobileMenuButton
