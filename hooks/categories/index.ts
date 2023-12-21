import { useCallback } from 'react'
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addCategoryState,
  updateSelectedCategory,
} from '../../lib/features/categories/categoriesSlice'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import { Category } from '@/types/Category'

const useCategories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories.items)
  const status = useAppSelector((state) => state.categories.status)
  const error = useAppSelector((state) => state.categories.error)
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  )

  const loadCategories = useCallback(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const createCategory = useCallback(
    async (categoryData: string) => {
      const newCategory = await dispatch(addCategory(categoryData))
      dispatch(addCategoryState(newCategory))
      loadCategories()
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
    (categoryId: number) => {
      dispatch(deleteCategory(categoryId))
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

  return {
    categories,
    status,
    error,
    loadCategories,
    createCategory,
    modifyCategory,
    removeCategory,
    updateCategoryChosen,
    getCategoryNameById,
    getCategoryIdByName,
    selectedCategory,
  }
}

export default useCategories
