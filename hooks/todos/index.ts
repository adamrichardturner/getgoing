import { useCallback, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../lib/hooks'
import {
  fetchTodos,
  addTodo,
  toggleTodoComplete,
  addNewTodo,
  toggleComplete,
  addSearchTerm,
  deleteTodo,
  editTodo
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
  const searchTerm = useAppSelector(
    (state: RootState) => state.todos.searchTerm
  )

  const loadTodos = useCallback(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const changeComplete = useCallback(() => {
    dispatch(toggleComplete)
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

  // Update searchTerm in global state immediately
  const updateSearchTerm = useCallback(
    (newTerm: string) => {
      dispatch(addSearchTerm(newTerm))
    },
    [dispatch]
  )

  // Use a separate state for debouncing API calls or heavy computations
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
      // This is where you debounce the API calls or heavy computations
      setDebouncedTerm(searchTerm)
    }, 500) // 500ms delay

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const handleDeleteTodo = useCallback(
    async (todoId: number) => {
      try {
        await dispatch(deleteTodo(todoId))
        loadTodos() // Reload todos to reflect the deletion
      } catch (error) {
        console.error('Failed to delete todo:', error)
      }
    },
    [dispatch]
  )

  const handleEditTodo = useCallback(
    async (changes: Partial<Todo>) => {
      try {
        await dispatch(editTodo({ changes }))
        loadTodos() // Reload todos to reflect the edit
      } catch (error) {
        console.error('Failed to edit todo:', error)
      }
    },
    [dispatch]
  )

  return {
    todos,
    categories,
    status,
    searchTerm,
    debouncedTerm,
    error,
    handleEditTodo,
    handleDeleteTodo,
    changeComplete,
    loadTodos,
    handleAddTodo,
    toggleTodoCompleteCallback,
    filterByCategory,
    updateSearchTerm
  }
}

export default useTodos
