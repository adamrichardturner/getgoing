'use client'

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import eyeWhite from '@/public/logo/eye-white.png'
import useTodos from '@/hooks/todos'
import { LeagueSpartan } from '@/app/fonts'

const LogoComponent: FC = () => {
  const { loadTodos } = useTodos()
  return (
    <div className="flex flex-row space-x-2 items-center">
      <Link
        href="/"
        onClick={() => loadTodos()}
        className="py-2 px-0 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        <div>
          <Image src={eyeWhite} width={32} height={32} alt="GetGoing Logo" />
        </div>
        <div className="flex flex-row items-center">
          <h1
            className={`${LeagueSpartan.className} text-xl font-semibold ml-2`}
          >
            GetGoing
          </h1>
        </div>
      </Link>
    </div>
  )
}

export default LogoComponent
