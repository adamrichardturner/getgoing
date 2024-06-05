"use client"
import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from "../lib/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<{ store: AppStore; persistor: any } | null>(null)

  if (!storeRef.current) {
    const store = makeStore()
    const persistor = persistStore(store)
    storeRef.current = { store, persistor }
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
