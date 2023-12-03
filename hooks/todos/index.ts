import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import {
  fetchTodos,
  addTodo,
  toggleComplete,
  toggleTodoComplete
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
    }
  }

  const toggleTodoCompleteCallback = useCallback(
    async (todoId: number) => {
      try {
        const actionResult = await dispatch(toggleTodoComplete(todoId))

        if (toggleTodoComplete.fulfilled.match(actionResult)) {
          // Assuming actionResult.payload is of type Todo
          const updatedTodo = actionResult.payload as Todo
          return updatedTodo
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
    toggleTodoCompleteCallback
  }
}

export default useTodos
