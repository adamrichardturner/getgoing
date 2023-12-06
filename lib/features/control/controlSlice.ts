import { createSlice } from '@reduxjs/toolkit'
// Define a type
interface ControlState {
  sort_option: string
  filter_option: string
  color: string
  completed: boolean
}

// Initial state
const initialState: ControlState = {
  sort_option: 'default',
  filter_option: 'none',
  color: '#2464CF',
  completed: false
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
    },
    updateColor: (state, action) => {
      state.color = action.payload
    },
    updateCompleted: (state, action) => {
      state.completed = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
  }
})

// Export the actions
export const { updateSort, updateFilter, updateColor, updateCompleted } =
  controlSlice.actions

export default controlSlice.reducer
