'use client'

import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '@/types/Theme'

const initialState: Theme = {
  smallScreen: typeof window !== 'undefined' && window.innerWidth < 800,
  isDrawerOpen: false,
  isTaskbarOpen: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleScreen: (state) => {
      state.smallScreen = !state.smallScreen
    },
    setSmallScreen: (state, action) => {
      state.smallScreen = action.payload
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    changeDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload
    },
    toggleTaskbarOpen: (state) => {
      state.isTaskbarOpen = !state.isTaskbarOpen
    },
    changeTaskbarOpen: (state, action) => {
      state.isTaskbarOpen = action.payload
    },
  },
})

export const {
  toggleScreen,
  setSmallScreen,
  toggleDrawer,
  changeDrawerOpen,
  toggleTaskbarOpen,
  changeTaskbarOpen,
} = themeSlice.actions

export default themeSlice.reducer
