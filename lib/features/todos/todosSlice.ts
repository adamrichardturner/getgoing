import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '@/types/Todo'
import { Category } from '@/types/Category'

export interface TodosState {
  items: Todo[]
  categories: Category[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TodosState = {
  items: [],
  categories: [],
  status: 'idle',
  error: null
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

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload)
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
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
  }
})

export const { addTodo, toggleComplete } = todosSlice.actions

export default todosSlice.reducer
