import { useCallback } from 'react'
import {
  setSmallScreen,
  changeDrawerOpen,
  toggleDrawer
} from '@/lib/features/theme/themeSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'

const useMyTheme = () => {
  const dispatch = useAppDispatch()
  const smallScreen = useAppSelector((state) => state.theme.smallScreen)
  const isDrawerOpen = useAppSelector((state) => state.theme.isDrawerOpen)

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

  return {
    smallScreen,
    changeSmallScreen,
    switchSmallScreen,
    switchDrawerOpen,
    updateDrawerOpen,
    isDrawerOpen
  }
}

export default useMyTheme
