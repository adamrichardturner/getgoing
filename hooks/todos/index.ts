import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import {
  fetchTodos,
  addTodo,
  toggleComplete
} from '../../lib/features/todos/todosSlice'
import { RootState } from '../../lib/store'
import { Todo } from '@/types/Todo'

const useTodos = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state: RootState) => state.todos.items)
  const categories = useAppSelector(
    (state: RootState) => state.categories.items
  ) // Assuming you have items in categories
  const status = useAppSelector((state: RootState) => state.todos.status)
  const error = useAppSelector((state: RootState) => state.todos.error)

  const loadTodos = useCallback(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const createTodo = useCallback(
    (newTodo: Todo) => {
      dispatch(addTodo(newTodo))
    },
    [dispatch]
  )

  const toggleTodoComplete = useCallback(
    (todoId: number) => {
      dispatch(toggleComplete(todoId))
    },
    [dispatch]
  )

  return {
    todos,
    categories,
    status,
    error,
    loadTodos,
    createTodo,
    toggleTodoComplete
  }
}

export default useTodos
