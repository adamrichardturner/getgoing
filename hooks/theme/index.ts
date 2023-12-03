import { useCallback } from 'react'
import { setSmallScreen } from '@/lib/features/theme/themeSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import { Theme } from '@/types/Theme'

const useMyTheme = () => {
  const dispatch = useAppDispatch()
  const smallScreen = useAppSelector((state) => state.theme.smallScreen)

  const changeSmallScreen = useCallback(
    (isSmall: boolean) => {
      dispatch(setSmallScreen(isSmall))
    },
    [dispatch]
  )

  return {
    smallScreen,
    changeSmallScreen
  }
}

export default useMyTheme
