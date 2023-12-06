import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import {
  updateFilter,
  updateSort,
  updateColor,
  updateCompleted
} from '@/lib/features/control/controlSlice'
import { Todo } from '@/types/Todo'

const useControl = () => {
  const dispatch = useAppDispatch()
  const filterOption = useAppSelector((state) => state.control.filter_option)
  const sortOption = useAppSelector((state) => state.control.sort_option)
  const selectedColor = useAppSelector((state) => state.control.color)
  const selectedCompletion = useAppSelector((state) => state.control.completed)

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
    filterOption,
    sortOption,
    selectedColor,
    selectedCompletion
  }
}

export default useControl
