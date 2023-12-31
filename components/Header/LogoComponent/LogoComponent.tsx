'use client'

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import getGoing from '@/public/logo/getgoing.svg'
import useTodos from '@/hooks/todos'
import { LeagueSpartan } from '@/app/fonts'
import useControl from '@/hooks/control'
import useCategories from '@/hooks/categories'

const LogoComponent: FC = () => {
  const { loadTodos } = useTodos()
  const { resetControls } = useControl()
  const { updateCategoryChosen } = useCategories()

  const handleClick = () => {
    resetControls()
    updateCategoryChosen(999)
    loadTodos()
  }
  return (
    <div className='flex flex-row space-x-2 items-center'>
      <Link
        href='/'
        onClick={() => handleClick()}
        className='py-2 px-0 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
      >
        <div>
          <Image src={getGoing} width={32} height={32} alt='GetGoing Logo' />
        </div>
        <div className='flex flex-row items-center pt-0.5'>
          <h1
            className={`${LeagueSpartan.className} text-xl font-semibold ml-2 flex flex-row items-end`}
          >
            GetGoing
          </h1>
        </div>
      </Link>
    </div>
  )
}

export default LogoComponent
