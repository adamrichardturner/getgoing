import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { Category } from "@/types/Category"

// Define a type for the categories state
interface CategoriesState {
  items: Category[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  selectedCategory: number | 999
}

// Initial state of the categories slice
const initialState: CategoriesState = {
  items: [],
  status: "idle",
  error: null,
  selectedCategory: 999,
}

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        throw new Error("Failed to fetch categories: " + response.statusText)
      }
      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred")
    }
  }
)

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryName: string, thunkAPI) => {
    try {
      const newCategory = {
        name: categoryName,
      }

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) {
        throw new Error("Failed to add category: " + response.statusText)
      }

      const responseData = await response.json()
      return responseData
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred")
    }
  }
)

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (categoryData: Category, thunkAPI) => {
    try {
      const response = await fetch(`/api/categories/${categoryData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred")
    }
  }
)

export const patchCategory = createAsyncThunk(
  "categories/patchCategory",
  async ({ id, name }: any, thunkAPI) => {
    try {
      const response = await fetch(`/api/categories?=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, name: name }),
      })

      if (!response.ok) {
        throw new Error("Failed to patch category: " + response.statusText)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred")
    }
  }
)

// Async thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: number, thunkAPI) => {
    try {
      const response = await fetch(`/api/categories?id=${categoryId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(
          `Failed to delete category with id ${categoryId}: ` +
            response.statusText
        )
      }
      return categoryId
    } catch (error) {
      if (error instanceof Error) {
        console.log("error is ", error.message)
        return thunkAPI.rejectWithValue(error.message)
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred")
    }
  }
)

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategoriesState: () => initialState,
    addCategoryState: (state, action) => {
      state.items.push(action.payload)
    },
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succeeded"
          state.items = action.payload
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      // Handling addCategory
      .addCase(addCategory.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = "succeeded"
          // Add the new category to the items array
          state.items.push(action.payload)
        }
      )
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      // Handling updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = "succeeded"
          // Find and update the category in the state
          const index = state.items.findIndex(
            (category) => category.id === action.payload.id
          )
          if (index !== -1) {
            state.items[index] = action.payload
          }
        }
      )
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      // Handling deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded"
          state.items = state.items.filter(
            (category) => category.id !== action.payload
          )
        }
      )
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
  },
})

// Export the actions
export const {
  resetCategoriesState,
  addCategoryState,
  updateSelectedCategory,
} = categoriesSlice.actions

export default categoriesSlice.reducer
