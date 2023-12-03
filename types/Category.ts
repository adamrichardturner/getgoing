export interface Category {
  id: number
  name: string
  user_id: string
}

export interface NewCategory {
  user_id: string | undefined
  name: string
}
