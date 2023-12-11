import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import {
  updateFilter,
  updateSort,
  updateColor,
  updateCompleted,
  updateAscending
} from '@/lib/features/control/controlSlice'
import { Todo } from '@/types/Todo'

const useControl = () => {
  const dispatch = useAppDispatch()
  const filterOption = useAppSelector((state) => state.control.filter_option)
  const sortOption = useAppSelector((state) => state.control.sort_option)
  const selectedColor = useAppSelector((state) => state.control.color)
  const selectedCompletion = useAppSelector((state) => state.control.completed)
  const selectedAscending = useAppSelector((state) => state.control.ascending)

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

  const changeCompleted = useCallback(
    (newCompleted: boolean) => {
      dispatch(updateCompleted(newCompleted))
    },
    [dispatch]
  )

  const changeColor = useCallback(
    (newColor: string) => {
      dispatch(updateColor(newColor))
    },
    [dispatch]
  )

  const changeAscending = useCallback(
    (newAscending: boolean) => {
      dispatch(updateAscending(newAscending))
    },
    [dispatch]
  )

  const clearFilter = useCallback(() => {
    dispatch(updateFilter('none'))
  }, [dispatch])

  const clearSort = useCallback(() => {
    dispatch(updateSort('creationDate'))
  }, [dispatch])

  const clearCompleted = useCallback(() => {
    dispatch(updateCompleted(false))
  }, [dispatch])

  const clearColor = useCallback(() => {
    dispatch(updateColor(''))
  }, [dispatch])

  const clearAscending = useCallback(() => {
    dispatch(updateAscending(false))
  }, [dispatch])

  const resetControls = useCallback(() => {
    clearFilter()
    clearSort()
    clearCompleted()
    clearColor()
    clearAscending()
  }, [dispatch])

  const filterTodos = useCallback(
    (todos: Todo[], selectedFilter: string, selectedColor: string) => {
      if (selectedFilter === 'completed') {
        return todos.filter((item) => item.completed)
      } else if (selectedFilter === 'not_completed') {
        return todos.filter((item) => !item.completed)
      } else if (selectedFilter === 'color') {
        return todos.filter((item) => item.color === selectedColor)
      } else if (selectedFilter === 'none') {
        return todos
      }
    },
    [dispatch]
  )

  return {
    changeFilter,
    changeSort,
    filterTodos,
    changeCompleted,
    changeColor,
    changeAscending,
    clearFilter,
    clearSort,
    clearColor,
    clearCompleted,
    clearAscending,
    resetControls,
    filterOption,
    sortOption,
    selectedColor,
    selectedCompletion,
    selectedAscending
  }
}

export default useControl
