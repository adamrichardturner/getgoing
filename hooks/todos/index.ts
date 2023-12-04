import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import {
  fetchTodos,
  addTodo,
  addTodoGroup,
  toggleTodoComplete,
  addNewTodo,
  toggleComplete
} from '../../lib/features/todos/todosSlice'
import { RootState } from '../../lib/store'
import { PreFormTodo, Todo } from '@/types/Todo'

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

  const handleAddTodo = async (todoData: PreFormTodo) => {
    try {
      const actionResult = await dispatch(addNewTodo(todoData))

      // Check if the action was fulfilled (i.e., the async thunk was successful)
      if (addNewTodo.fulfilled.match(actionResult)) {
        // The payload should be the new todo item
        const newTodo = actionResult.payload as Todo

        // Dispatch the new todo object
        dispatch(addTodo(newTodo))
        loadTodos()
      }
    } catch (error) {
      console.error('Failed to add new todo:', error)
    }
  }

  const filterByCategory = (todos: Todo[], id: number) => {
    return todos.filter((todo) => todo.category_id === id)
  }

  const toggleTodoCompleteCallback = useCallback(
    async (todoId: number) => {
      try {
        const actionResult = await dispatch(toggleTodoComplete(todoId))
        dispatch(toggleComplete(todoId))
        loadTodos()
        if (toggleTodoComplete.fulfilled.match(actionResult)) {
        }
      } catch (error) {
        console.error('Error toggling todo complete:', error)
      }
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
    toggleTodoCompleteCallback,
    filterByCategory
  }
}

export default useTodos
