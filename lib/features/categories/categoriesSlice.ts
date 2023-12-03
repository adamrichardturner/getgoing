import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '@/types/Category'

// Define a type for the categories state
interface CategoriesState {
  items: Category[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Initial state of the categories slice
const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null
}

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories: ' + response.statusText)
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

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryName: string, thunkAPI) => {
    try {
      const newCategory = {
        name: categoryName
      }

      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
      })

      if (!response.ok) {
        throw new Error('Failed to add category: ' + response.statusText)
      }

      const responseData = await response.json()
      return responseData // Assuming the server returns the created category
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)

// Async thunk for updating a category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (categoryData: Category, thunkAPI) => {
    // Add logic
  }
)

// Async thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId: number, thunkAPI) => {
    // Add logic
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Reducers for handling non-async actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = 'succeeded'
          state.items = action.payload
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
    // Handle additional cases for addCategory, updateCategory, and deleteCategory
  }
})

// Export the actions
export const {} = categoriesSlice.actions

export default categoriesSlice.reducer
