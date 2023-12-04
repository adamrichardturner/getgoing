import { createSlice } from '@reduxjs/toolkit'
// Define a type
interface ControlState {
  sort_option: string
  filter_option: string
}

// Initial state
const initialState: ControlState = {
  sort_option: 'default',
  filter_option: 'none'
}

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    updateSort: (state, action) => {
      state.sort_option = action.payload
    },
    updateFilter: (state, action) => {
      state.filter_option = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
  }
})

// Export the actions
export const { updateSort, updateFilter } = controlSlice.actions

export default controlSlice.reducer
