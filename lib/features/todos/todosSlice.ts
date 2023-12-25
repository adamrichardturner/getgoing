import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { PreFormTodo, Todo } from '@/types/Todo'
import { Category } from '@/types/Category'
import { RootState } from '@/lib/store'

export interface TodosState {
  items: Todo[]
  filteredItems: Todo[]
  categories: Category[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchTerm: string
}

const initialState: TodosState = {
  items: [],
  filteredItems: [],
  categories: [],
  status: 'idle',
  error: null,
  searchTerm: '',
}

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/todos')
      if (!response.ok) {
        // If the response is not ok, throw an Error
        throw new Error('Failed to fetch todos: ' + response.statusText)
      }
      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      // If the error is not an instance of Error
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

// Async thunk for adding a new todo
export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (newTodo: PreFormTodo, thunkAPI) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })

      if (!response.ok) {
        throw new Error('Failed to add todo: ' + response.statusText)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleTodoComplete',
  async (todoId: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const todoToToggle = state.todos.items.find((todo) => todo.id === todoId)

      if (!todoToToggle) {
        throw new Error('Todo not found')
      }

      const updatedTodo = {
        ...todoToToggle,
        completed: !todoToToggle.completed,
      }

      console.log('Slice updated todo ', updatedTodo)

      const response = await fetch(`/api/todos?id=${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })

      console.log('PUT slice response ', response)

      if (!response.ok) {
        throw new Error('Failed to update todo: ' + response.statusText)
      }

      // Dispatch the toggleComplete action
      thunkAPI.dispatch(toggleComplete(todoId))

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

export const patchTodo = createAsyncThunk(
  'todos/patchTodo',
  async ({ id, changes }: { id: number; changes: PreFormTodo }, thunkAPI) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      })

      if (!response.ok) {
        throw new Error('Failed to patch todo: ' + response.statusText)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: number, thunkAPI) => {
    try {
      const response = await fetch(`/api/todos?id=${todoId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo: ' + response.statusText)
      }

      return todoId // Return the id of the deleted todo
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

// async thunk for deleting to do optimistic UI
export const deleteTodoOptimistic = createAsyncThunk(
  'todos/deleteTodoOptimistic',
  async (todoId: number, thunkAPI) => {
    try {
      const response = await fetch(`/api/todos?id=${todoId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }
      return `Task with ID ${todoId} deleted successfully`
    } catch (error) {
      if (error instanceof Error) {
        return `Task with ID ${todoId} failed to delete`
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

// Async thunk for editing a todo
export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async ({ id, changes }: { id: number; changes: PreFormTodo }, thunkAPI) => {
    console.log('editing task ', id)
    console.log('changes to post are ', changes)
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo: ' + response.statusText)
      }

      console.log('edit to do response is ', response)

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

// Async thunk for updating todo order
export const updateTodoOrder = createAsyncThunk(
  'todos/updateTodoOrder',
  async (newOrder: number[], thunkAPI) => {
    try {
      const response = await fetch('/api/todos/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo order: ' + response.statusText)
      }

      // Return the new order
      return newOrder
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    resetTodosState: () => initialState,
    reorderTodos: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const { startIndex, endIndex } = action.payload

      if (startIndex === endIndex) {
        return
      }

      const result = Array.from(state.items)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      state.items = result
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload)
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
    },
    addTodoGroup: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload
    },
    addTodoFilterGroup: (state, action: PayloadAction<Todo[]>) => {
      state.filteredItems = action.payload
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    addSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        updateTodoOrder.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          const newOrder = action.payload
          const reorderedItems = newOrder
            .map((orderId) => state.items.find((item) => item.id === orderId))
            .filter((item) => item !== undefined) as Todo[]

          state.items = reorderedItems
        }
      )
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      // Handling addNewTodo thunk
      .addCase(addNewTodo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addNewTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(toggleTodoComplete.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        toggleTodoComplete.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const index = state.items.findIndex(
            (todo) => todo.id === action.payload.id
          )
          if (index !== -1) {
            state.items[index] = action.payload
          }
          state.status = 'succeeded'
        }
      )
      .addCase(toggleTodoComplete.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        )
        if (index !== -1) {
          state.items[index] = action.payload // Update the todo item
        }
        state.status = 'succeeded'
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(editTodo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(patchTodo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(patchTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        )
        if (index !== -1) {
          // Update only the specified fields
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
          }
        }
        state.status = 'succeeded'
      })
      .addCase(patchTodo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(deleteTodoOptimistic.rejected, (state, action) => {
        // Handle the failure case. The UI update has already been handled
        state.status = 'failed'
        state.error = action.error.message || null
      })
  },
})

export const {
  resetTodosState,
  addTodo,
  removeTodo,
  addTodoGroup,
  toggleComplete,
  addSearchTerm,
  addTodoFilterGroup,
  reorderTodos,
} = todosSlice.actions

export default todosSlice.reducer
