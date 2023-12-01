import { useCallback } from 'react'
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from '../../lib/features/categories/categoriesSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import { Category } from '@/types/Category'
const useCategories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories.items)
  const status = useAppSelector((state) => state.categories.status)
  const error = useAppSelector((state) => state.categories.error)

  const loadCategories = useCallback(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const createCategory = useCallback(
    (categoryData: Category) => {
      dispatch(addCategory(categoryData))
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
    (categoryId: number) => {
      dispatch(deleteCategory(categoryId))
    },
    [dispatch]
  )

  return {
    categories,
    status,
    error,
    loadCategories,
    createCategory,
    modifyCategory,
    removeCategory
  }
}

export default useCategories
