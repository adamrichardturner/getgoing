import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosSlice'
import categoriesReducer from './features/categories/categoriesSlice'
import themeReducer from './features/theme/themeSlice'
import controlReducer from './features/control/controlSlice'
import authReducer from './features/auth/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      categories: categoriesReducer,
      theme: themeReducer,
      control: controlReducer,
      auth: authReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
