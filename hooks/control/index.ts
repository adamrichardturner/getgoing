import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import {
  updateFilter,
  updateSort,
  updateColor,
  updateCompleted,
  updateAscending,
  updateToggleAscending,
} from '@/lib/features/control/controlSlice'
import { Todo } from '@/types/Todo'
import useTodos from '../todos'

const useControl = () => {
  const { filterByCategory, searchTerm, todos } = useTodos()
  const dispatch = useAppDispatch()
  const filterOption = useAppSelector((state) => state.control.filter_option)
  const sortOption = useAppSelector((state) => state.control.sort_option)
  const selectedColor = useAppSelector((state) => state.control.color)
  const selectedCompletion = useAppSelector((state) => state.control.completed)
  const selectedAscending = useAppSelector((state) => state.control.ascending)
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  )

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

  const toggleAscending = useCallback(() => {
    dispatch(updateToggleAscending())
  }, [dispatch])

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
    (todos: Todo[], selectedFilter: string, selectedColor?: string) => {
      if (selectedFilter === 'completed') {
        return todos.filter((item) => item.completed)
      } else if (selectedFilter === 'not_completed') {
        return todos.filter((item) => !item.completed)
      } else if (selectedFilter === 'color') {
        return todos.filter((item) => item.color === selectedColor)
      } else if (selectedFilter === 'none') {
        return todos
      }
      return todos
    },
    [dispatch]
  )

  const sortTodos = (todos: Todo[], sortOption: string) => {
    switch (sortOption) {
      case 'dueDate':
        return [...todos].sort((a, b) => {
          const dateA = a.due_date ? new Date(a.due_date) : new Date(0)
          const dateB = b.due_date ? new Date(b.due_date) : new Date(0)
          return dateA.getTime() - dateB.getTime()
        })
      case 'alpha':
        return [...todos].sort((a, b) => a.content.localeCompare(b.content))
      case 'updatedDate':
        return [...todos].sort((a, b) => {
          const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0)
          const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0)
          return dateA.getTime() - dateB.getTime()
        })
      case 'creationDate':
        return [...todos].sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
          return dateA.getTime() - dateB.getTime()
        })
      default:
        return todos
    }
  }

  // New search term filter
  const filterBySearchTerm = (todos: Todo[], searchTerm: string) => {
    if (!searchTerm) return todos
    return todos.filter((todo: Todo) =>
      todo.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getFilteredAndSortedTodos = useCallback(() => {
    let result: Todo[] = [...todos]

    // Filter by category
    result =
      selectedCategory === 999
        ? todos
        : filterByCategory(todos, selectedCategory) || []

    // Apply additional filters (completed, color, search term)
    result = filterTodos(result, filterOption, selectedColor)
    result = filterBySearchTerm(result, searchTerm)

    // Sort todos based on the selected sorting option
    result = sortTodos(result, sortOption)

    return result
  }, [
    filterOption,
    selectedColor,
    searchTerm,
    sortOption,
    selectedCategory,
    todos,
  ])

  const filteredAndSortedTodos = getFilteredAndSortedTodos()

  return {
    filteredAndSortedTodos,
    sortTodos,
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
    filterBySearchTerm,
    toggleAscending,
    filterOption,
    sortOption,
    selectedColor,
    selectedCompletion,
    selectedAscending,
  }
}

export default useControl
