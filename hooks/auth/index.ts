import { useCallback } from 'react'
import { addUserId } from '../../lib/features/auth/authSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'

const useMyAuth = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.auth.userId)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const updateUserId = useCallback(
    (id: string) => {
      dispatch(addUserId(id))
    },
    [dispatch]
  )

  return {
    userId,
    isAuthenticated,
    updateUserId
  }
}

export default useMyAuth
