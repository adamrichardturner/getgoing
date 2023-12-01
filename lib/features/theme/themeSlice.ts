import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '@/types/Theme'

const initialState: Theme = {
  smallScreen: false
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
    }
  }
})

export const { toggleScreen, setSmallScreen } = themeSlice.actions

export default themeSlice.reducer
