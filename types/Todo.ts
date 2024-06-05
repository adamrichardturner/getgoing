// Type for a Single To Do Item
export interface Todo {
  order_index: number
  id: number
  user_id?: string
  content: string
  category?: string
  created_at?: string
  updated_at?: string
  due_date?: string
  color?: string
  category_id: number
  completed: boolean
  handleUpdateTodoOrder: (
    updatedTodos: any
  ) => Promise<
    | "Todo order updated successfully"
    | "Failed to update todo order"
    | undefined
  >
}

export interface NewToDo {
  category?: string
  content: string
  due_date: Date | null | undefined
  color?: string // HEX code
  completed: boolean
  user_id: string | undefined | null
}

export interface PreFormTodo {
  category_id?: number | null
  content: string
  due_date: Date | null | undefined
  color?: string
  completed: boolean
  id?: number
}
