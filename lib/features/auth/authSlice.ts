import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  userId: string
  isAuthenticated: boolean
}

const initialState: AuthState = {
  userId: '',
  isAuthenticated: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserId: (state, action) => {
      state.userId = action.payload
    },
    toggleAuthenticated: (state) => {
      state.isAuthenticated = !state.isAuthenticated
    }
  }
})

// Export the actions
export const { addUserId, toggleAuthenticated } = authSlice.actions

export default authSlice.reducer
