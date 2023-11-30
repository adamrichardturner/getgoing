import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NewToDo } from '@/types/Todo'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

function validateData(data: any): data is NewToDo {
  return (
    typeof data.user_id === 'string' &&
    typeof data.content === 'string' &&
    (typeof data.due_date === 'string' || data.due_date === null) &&
    (typeof data.color === 'string' || data.color === null) &&
    (typeof data.category_id === 'number' || data.category_id === null) &&
    typeof data.completed === 'boolean'
  )
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    const { data: todos, error } = await supabase.from('todos').select()

    if (error) throw new Error(error.message)

    res.status(200).json(todos)
  } catch (error) {
    console.error('Error fetching data', error)
    res.status(500).json({ error: 'Error fetching data' })
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    const todo: NewToDo = req.body

    if (!validateData(todo)) {
      return res.status(400).json({ error: 'Invalid data format' })
    }

    const { data, error } = await supabase.from('todos').insert([todo])
    if (error) throw new Error(error.message)

    res.status(200).json({ message: 'Todo added successfully', data })
  } catch (error) {
    console.error('Error inserting data', error)
    res.status(500).json({ error: 'Error inserting data' })
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  // Assuming the todo ID is sent in the request body with the NewToDo
  const { id, ...todo }: { id: number } & NewToDo = req.body

  if (!id) {
    return res.status(400).json({ error: 'Todo ID is required for updating' })
  }

  if (!validateData(todo)) {
    return res.status(400).json({ error: 'Invalid data format' })
  }

  try {
    const { error } = await supabase.from('todos').update(todo).match({ id })

    if (error) throw new Error(error.message)

    res.status(200).json({ message: 'Todo updated successfully' })
  } catch (error) {
    console.error('Error updating data', error)
    res.status(500).json({ error: 'Error updating data' })
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  // Assuming the todo ID is sent as a query parameter
  const todoId = req.query.id

  if (!todoId || typeof todoId !== 'string') {
    return res
      .status(400)
      .json({ error: 'A valid todo ID is required for deletion' })
  }

  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .match({ id: todoId })

    if (error) throw new Error(error.message)

    res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Error deleting data', error)
    res.status(500).json({ error: 'Error deleting data' })
  }
}
