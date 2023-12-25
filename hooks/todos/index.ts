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
  deleteTodoOptimistic,
  editTodo,
  patchTodo,
  addTodoFilterGroup,
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

  const updateFilteredTodos = useCallback(
    (todos: Todo[]) => {
      dispatch(addTodoFilterGroup(todos))
    },
    [dispatch]
  )

  const loadTodos = useCallback(async () => {
    await dispatch(fetchTodos())
  }, [dispatch])

  const changeComplete = useCallback(
    (id: number) => {
      dispatch(toggleComplete(id))
    },
    [dispatch]
  )

  const handleAddTodo = async (todoData: PreFormTodo) => {
    try {
      const actionResult = await dispatch(addNewTodo(todoData))
      if (addNewTodo.fulfilled.match(actionResult)) {
        const newTodo = actionResult.payload as Todo
        dispatch(addTodo(newTodo))
        loadTodos()
        return 'Task added successfully'
      }
    } catch (error) {
      console.error('Failed to add new todo:', error)
    }
  }

  const filterByCategory = useCallback((todos: Todo[], id: number) => {
    return todos.filter((todo) => todo.category_id === id)
  }, [])

  const toggleTodoCompleteCallback = useCallback(
    async (todoId: number) => {
      try {
        await dispatch(toggleTodoComplete(todoId))
      } catch (error) {
        console.error('Error toggling todo complete:', error)
      }
    },
    [dispatch]
  )

  const updateSearchTerm = useCallback(
    (newTerm: string) => {
      dispatch(addSearchTerm(newTerm))
    },
    [dispatch]
  )

  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const handleDeleteTask = useCallback(
    async (todoId: number) => {
      try {
        const actionResult = await dispatch(deleteTodoOptimistic(todoId))
        if (actionResult) {
          const message = actionResult.payload
          dispatch(deleteTodo(todoId))
          loadTodos()
          return message
        }
      } catch (error) {
        if (error instanceof Error) {
          return error.message
        }
        return 'An unknown error occurred'
      }
    },
    [dispatch]
  )

  const handleEditTodo = useCallback(
    async (id: number, changes: PreFormTodo) => {
      const newToDo = { id, changes }
      try {
        await dispatch(editTodo(newToDo))
      } catch (error) {
        console.error('Failed to edit todo:', error)
      }
    },
    [dispatch, loadTodos, todos]
  )

  const handlePatchTodo = useCallback(
    async (id: number, changes: PreFormTodo) => {
      const newToDo = { id, changes }
      try {
        await dispatch(patchTodo(newToDo))
      } catch (error) {
        console.error('Failed to edit todo:', error)
      }
    },
    [dispatch, loadTodos, todos]
  )

  return {
    todos,
    categories,
    status,
    searchTerm,
    debouncedTerm,
    error,
    handleEditTodo,
    handleDeleteTask,
    changeComplete,
    loadTodos,
    handleAddTodo,
    toggleTodoCompleteCallback,
    filterByCategory,
    updateSearchTerm,
    handlePatchTodo,
    updateFilteredTodos,
  }
}

export default useTodos
