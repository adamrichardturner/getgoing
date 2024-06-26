import { createSlice } from "@reduxjs/toolkit"

interface ControlState {
  sort_option: string
  filter_option: string
  color: string
  completed: boolean
  ascending: boolean
}

const initialState: ControlState = {
  sort_option: "creationDate",
  filter_option: "not_completed",
  color: "",
  completed: false,
  ascending: false,
}

export const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    resetControlState: () => initialState,
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
    },
    updateAscending: (state, action) => {
      state.ascending = action.payload
    },
    updateToggleAscending: (state) => {
      state.ascending = !state.ascending
    },
  },
  extraReducers: (builder) => {
    builder
  },
})

export const {
  resetControlState,
  updateSort,
  updateFilter,
  updateColor,
  updateCompleted,
  updateAscending,
  updateToggleAscending,
} = controlSlice.actions

export default controlSlice.reducer
