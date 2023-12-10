import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: {}
  userId: string
  isAuthenticated: boolean
  isSupabaseConnected: boolean
}

const initialState: AuthState = {
  user: {},
  userId: '',
  isAuthenticated: false,
  isSupabaseConnected: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload
    },
    addUserId: (state, action) => {
      state.userId = action.payload
    },
    toggleAuthenticated: (state) => {
      state.isAuthenticated = !state.isAuthenticated
    },
    toggleIsSupabaseConnected: (state) => {
      state.isSupabaseConnected = !state.isSupabaseConnected
    },
    setSupabaseConnected: (state, action) => {
      state.isSupabaseConnected = action.payload
    }
  }
})

// Export the actions
export const {
  addUserId,
  addUser,
  toggleAuthenticated,
  toggleIsSupabaseConnected,
  setSupabaseConnected
} = authSlice.actions

export default authSlice.reducer
