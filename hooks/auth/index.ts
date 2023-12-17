'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import {
  addUserId,
  setSupabaseConnected,
  addUser,
} from '../../lib/features/auth/authSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'

const useMyAuth = () => {
  const router = useRouter()
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

  const updateUser = useCallback(
    (user: any) => {
      dispatch(addUser(user))
    },
    [user, dispatch]
  )

  const signOut = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to log out')
      }

      updateUser(null)
      updateUserId('')
      updateIsSuperbaseConnected(false)

      // Redirect to the login page
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [updateUser, updateUserId, updateIsSuperbaseConnected, router])

  return {
    user,
    userId,
    isAuthenticated,
    isSupabaseConnected,
    signOut,
    updateUserId,
    updateUser,
    updateIsSuperbaseConnected,
  }
}

export default useMyAuth
