'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import {
  resetAuthState,
  addUserId,
  setSupabaseConnected,
  addUser,
} from '../../lib/features/auth/authSlice'
import { resetCategoriesState } from '@/lib/features/categories/categoriesSlice'
import { resetControlState } from '@/lib/features/control/controlSlice'
import { resetThemeState } from '@/lib/features/theme/themeSlice'
import { resetTodosState } from '@/lib/features/todos/todosSlice'
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

  const resetAllState = useCallback(() => {
    dispatch(resetAuthState())
    dispatch(resetCategoriesState())
    dispatch(resetControlState())
    dispatch(resetTodosState())
  }, [dispatch])

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
      resetAllState()
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to log out')
      }

      updateUser(null)
      updateUserId('')
      updateIsSuperbaseConnected(false)

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
    resetAllState,
  }
}

export default useMyAuth
