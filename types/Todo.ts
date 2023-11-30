// Type for a Single To Do Item
export interface Todo {
  id: number
  user_id: string
  content: string
  created_at: string
  updated_at: string
  due_date: string | null
  color: string | null // HEX code
  category_id: number | null
  completed: boolean
}

export interface NewToDo {
  user_id: string
  content: string
  due_date: string | null
  color: string | null // HEX code
  category_id: number | null
  completed: boolean
}
