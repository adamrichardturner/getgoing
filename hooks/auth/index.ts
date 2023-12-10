import { useCallback } from 'react'
import {
  addUserId,
  setSupabaseConnected,
  addUser
} from '../../lib/features/auth/authSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'

const useMyAuth = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const userId = useAppSelector((state) => state.auth.userId)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const isSupabaseConnected = useAppSelector(
    (state) => state.auth.isSupabaseConnected
  )

  const updateUserId = useCallback(
    (id: string) => {
      dispatch(addUserId(id))
    },
    [dispatch]
  )

  const updateIsSuperbaseConnected = useCallback(
    (newVal: boolean) => {
      dispatch(setSupabaseConnected(newVal))
    },
    [dispatch]
  )

  const updateUser = useCallback((user: any) => {
    dispatch(addUser(user))
  }, [])

  return {
    user,
    userId,
    isAuthenticated,
    isSupabaseConnected,
    updateUserId,
    updateUser,
    updateIsSuperbaseConnected
  }
}

export default useMyAuth
