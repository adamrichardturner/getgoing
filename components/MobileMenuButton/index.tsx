'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import useMyTheme from '@/hooks/theme'

const MobileMenuButton = () => {
  const { switchDrawerOpen } = useMyTheme()

  const toggleDrawer = () => {
    switchDrawerOpen()
  }

  return (
    <div className='fixed z-5 left-4 bottom-1/4'>
      <button
        className='md:hidden cursor-pointer bg-header dark:bg-white text-white dark:text-darkest w-10 shadow-lg h-10 rounded-full text-xl'
        onClick={() => toggleDrawer()}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  )
}

export default MobileMenuButton
