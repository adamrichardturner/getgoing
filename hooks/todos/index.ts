import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import {
  fetchTodos,
  addTodo,
  toggleComplete
} from '../../lib/features/todos/todosSlice'
import { RootState } from '../../lib/store'
import { NewToDo, Todo } from '@/types/Todo'
import { addNewTodo } from '../../lib/features/todos/todosSlice'

const useTodos = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state: RootState) => state.todos.items)
  const categories = useAppSelector(
    (state: RootState) => state.categories.items
  )
  const status = useAppSelector((state: RootState) => state.todos.status)
  const error = useAppSelector((state: RootState) => state.todos.error)

  const loadTodos = useCallback(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const handleAddTodo = async (todoData: NewToDo) => {
    try {
      const actionResult = await dispatch(addNewTodo(todoData))

      if (addNewTodo.fulfilled.match(actionResult)) {
        const newTodo = actionResult.payload
        dispatch(addTodo(newTodo))
      }
    } catch (error) {
      console.error('Failed to add new todo:', error)
      // Handle the error appropriately
    }
  }

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
    handleAddTodo,
    toggleTodoComplete
  }
}

export default useTodos
