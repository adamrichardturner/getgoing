import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk"
import todosReducer from "./features/todos/todosSlice"
import categoriesReducer from "./features/categories/categoriesSlice"
import themeReducer from "./features/theme/themeSlice"
import controlReducer from "./features/control/controlSlice"
import authReducer from "./features/auth/authSlice"

// Configuration for redux-persist
const persistConfig = {
  key: "control",
  storage,
}

// Create a persisted reducer
const persistedControlReducer = persistReducer(persistConfig, controlReducer)

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      categories: categoriesReducer,
      theme: themeReducer,
      control: persistedControlReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
