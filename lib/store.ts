import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosSlice'
import categoriesReducer from './features/categories/categoriesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      categories: categoriesReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
