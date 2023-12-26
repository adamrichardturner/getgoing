'use client'

import { useCallback } from 'react'
import {
  setSmallScreen,
  changeDrawerOpen,
  toggleDrawer,
  toggleTaskbarOpen,
  changeTaskbarOpen,
  setCategoriesLoading,
} from '@/lib/features/theme/themeSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'

const useMyTheme = () => {
  const dispatch = useAppDispatch()
  const smallScreen = useAppSelector((state) => state.theme.smallScreen)
  const isDrawerOpen = useAppSelector((state) => state.theme.isDrawerOpen)
  const isTaskbarOpen = useAppSelector((state) => state.theme.isTaskbarOpen)
  const isCategoriesLoading = useAppSelector(
    (state) => state.theme.isCategoriesLoading
  )

  const changeSmallScreen = useCallback(
    (isSmall: boolean) => {
      dispatch(setSmallScreen(isSmall))
    },
    [dispatch]
  )

  const switchSmallScreen = useCallback(() => {
    dispatch(setSmallScreen(!smallScreen))
  }, [dispatch])

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
    smallScreen,
    updateCategoriesLoading,
    changeSmallScreen,
    switchSmallScreen,
    switchDrawerOpen,
    updateDrawerOpen,
    updateTaskbarOpen,
    switchTaskbarOpen,
    isTaskbarOpen,
    isDrawerOpen,
    isCategoriesLoading,
  }
}

export default useMyTheme
