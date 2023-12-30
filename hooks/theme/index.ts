'use client'

import { useCallback } from 'react'
import {
  changeDrawerOpen,
  toggleDrawer,
  toggleTaskbarOpen,
  changeTaskbarOpen,
  setCategoriesLoading,
} from '@/lib/features/theme/themeSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import { useMediaQuery } from '@uidotdev/usehooks'

const useMyTheme = () => {
  const smallScreen = useMediaQuery('only screen and (max-width : 767px)')
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector((state) => state.theme.isDrawerOpen)
  const isTaskbarOpen = useAppSelector((state) => state.theme.isTaskbarOpen)
  const isCategoriesLoading = useAppSelector(
    (state) => state.theme.isCategoriesLoading
  )

  const switchDrawerOpen = useCallback(() => {
    dispatch(toggleDrawer())
  }, [dispatch])

  const updateDrawerOpen = useCallback(
    (newVal: boolean) => {
      dispatch(changeDrawerOpen(newVal))
    },
    [dispatch]
  )

  const updateTaskbarOpen = useCallback(
    (newVal: boolean) => {
      dispatch(changeTaskbarOpen(newVal))
    },
    [dispatch]
  )

  const updateCategoriesLoading = useCallback(
    (newVal: boolean) => {
      dispatch(setCategoriesLoading(newVal))
    },
    [dispatch]
  )

  const switchTaskbarOpen = useCallback(() => {
    dispatch(toggleTaskbarOpen())
  }, [dispatch, isTaskbarOpen])

  return {
    updateCategoriesLoading,
    switchDrawerOpen,
    updateDrawerOpen,
    updateTaskbarOpen,
    switchTaskbarOpen,
    isTaskbarOpen,
    isDrawerOpen,
    isCategoriesLoading,
    smallScreen,
  }
}

export default useMyTheme
