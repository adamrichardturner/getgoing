import { useCallback, useState } from 'react'
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addCategoryState,
  updateSelectedCategory,
  patchCategory,
} from '../../lib/features/categories/categoriesSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import { Category } from '@/types/Category'
import useTodos from '../todos'

interface UseCategoriesHook {
  categories: Category[]
  isLoading: boolean
  error: string | null
  loadCategories: () => Promise<void>
  createCategory: (categoryData: string) => Promise<any>
  modifyCategory: (categoryData: Category) => void
  removeCategory: (categoryId: number) => Promise<any>
  updateCategoryChosen: (categoryId: number) => void
  getCategoryNameById: (id: number) => string | undefined
  getCategoryIdByName: (name: string) => number | undefined
  getCompleteTasks: (id: number) => number
  getIncompleteTasks: (id: number) => number
  getAllTasks: () => number
  getAllIncompleteTasks: () => number
  getAllCompleteTasks: () => number
  renameCategory: ({ id, name }: { id: number; name: string }) => Promise<any>
  selectedCategory: number
}

const useCategories = (): UseCategoriesHook => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const categories = useAppSelector((state) => state.categories.items)
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  )
  const { todos, loadTodos } = useTodos()

  const loadCategories = useCallback(async () => {
    setIsLoading(true)
    try {
      await dispatch(fetchCategories())
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createCategory = useCallback(
    async (categoryData: string) => {
      const newCategory = await dispatch(addCategory(categoryData))
      dispatch(addCategoryState(newCategory))
      return newCategory
    },
    [dispatch]
  )

  const updateCategoryChosen = useCallback(
    (categoryId: number) => {
      dispatch(updateSelectedCategory(categoryId))
    },
    [dispatch]
  )

  const modifyCategory = useCallback(
    (categoryData: Category) => {
      dispatch(updateCategory(categoryData))
    },
    [dispatch]
  )

  const removeCategory = useCallback(
    async (categoryId: number) => {
      try {
        const response = await dispatch(deleteCategory(categoryId))
        if (response) {
          loadCategories()
          loadTodos()
          return response
        }
      } catch (error) {
        if (error instanceof Error) {
          return error.message
        }
      } finally {
        updateCategoryChosen(999)
      }
    },
    [dispatch]
  )

  const renameCategory = useCallback(
    async ({ id, name }: any) => {
      try {
        const response = await dispatch(patchCategory({ id: id, name: name }))
        if (response) {
          loadCategories()
          loadTodos()
          return response
        }
      } catch (error) {
        if (error instanceof Error) {
          return error.message
        }
      }
    },
    [dispatch]
  )

  const getCategoryNameById = (id: number) => {
    if (id === 999) return 'All Tasks'
    const categoryFound = categories.find((category) => category.id === id)
    if (categoryFound) return categoryFound.name
  }
  const getCategoryIdByName = (name: string) => {
    if (name === 'All Tasks') return 999
    const categoryFound = categories.find((category) => category.name === name)
    if (categoryFound) return categoryFound.id
  }

  const getIncompleteTasks = useCallback(
    (id: number) => {
      const allTodosByCategory = todos.filter((todo) => todo.category_id === id)
      return allTodosByCategory.filter((todo) => !todo.completed).length
    },
    [dispatch]
  )

  const getCompleteTasks = useCallback(
    (id: number): number => {
      const allTodosByCategory = todos.filter((todo) => todo.category_id === id)
      return allTodosByCategory.filter((todo) => todo.completed).length
    },
    [dispatch]
  )

  const getAllTasks = useCallback((): number => {
    return todos.length
  }, [dispatch])

  const getAllIncompleteTasks = useCallback((): number => {
    return todos.filter((todo) => !todo.completed).length
  }, [dispatch])

  const getAllCompleteTasks = useCallback((): number => {
    return todos.filter((todo) => todo.completed).length
  }, [dispatch])

  return {
    categories,
    isLoading,
    error,
    loadCategories,
    createCategory,
    modifyCategory,
    removeCategory,
    updateCategoryChosen,
    getCategoryNameById,
    getCategoryIdByName,
    getCompleteTasks,
    getIncompleteTasks,
    getAllTasks,
    getAllIncompleteTasks,
    getAllCompleteTasks,
    renameCategory,
    selectedCategory,
  }
}

export default useCategories
