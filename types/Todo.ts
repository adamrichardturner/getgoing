// Type for a Single To Do Item
export interface Todo {
  id?: number
  user_id?: string
  content: string
  category?: string
  created_at?: string
  updated_at?: string
  dueDate?: string | null
  color?: string | null // HEX code
  category_id?: number | null
  completed: boolean
}

export interface NewToDo {
  category?: string
  content: string
  due_date?: string | null
  color?: string | 'default-color' // HEX code
  completed: boolean
  user_id: string | undefined | null
}
