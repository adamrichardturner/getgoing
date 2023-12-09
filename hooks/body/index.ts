'use client'

import { useEffect } from 'react'

const useBodyScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [lock])
}

export default useBodyScrollLock
