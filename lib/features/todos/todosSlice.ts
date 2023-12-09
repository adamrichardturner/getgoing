import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { PreFormTodo, Todo } from '@/types/Todo'
import { Category } from '@/types/Category'
import { RootState } from '@/lib/store'

export interface TodosState {
  items: Todo[]
  categories: Category[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchTerm: string
}

const initialState: TodosState = {
  items: [],
  categories: [],
  status: 'idle',
  error: null,
  searchTerm: ''
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
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
        completed: !todoToToggle.completed
      }

      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      })

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

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: number, thunkAPI) => {
    try {
      const response = await fetch(`/api/todos?id=${todoId}`, {
        method: 'DELETE'
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

// Async thunk for editing a todo
export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async ({ changes }: { changes: Partial<Todo> }, thunkAPI) => {
    try {
      const response = await fetch(`/api/todos/${changes.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(changes)
      })

      if (!response.ok) {
        throw new Error('Failed to update todo: ' + response.statusText)
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

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload)
    },
    addTodoGroup: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    addSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded'
        state.items = state.items.filter((todo) => todo.id !== action.payload)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(editTodo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        )
        if (index !== -1) {
          // Update the todo item at the found index
          state.items[index] = action.payload
        }
        state.status = 'succeeded'
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export const { addTodo, addTodoGroup, toggleComplete, addSearchTerm } =
  todosSlice.actions

export default todosSlice.reducer
