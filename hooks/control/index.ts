import { useCallback } from 'react'
import { useAppDispatch } from '../../lib/hooks'
import { updateFilter, updateSort } from '@/lib/features/control/controlSlice'

const useControl = () => {
  const dispatch = useAppDispatch()

  const changeFilter = useCallback(
    (newFilter: string) => {
      dispatch(updateFilter(newFilter))
    },
    [dispatch]
  )

  const changeSort = useCallback(
    (newSort: string) => {
      dispatch(updateSort(newSort))
    },
    [dispatch]
  )

  return {
    changeFilter,
    changeSort
  }
}

export default useControl
