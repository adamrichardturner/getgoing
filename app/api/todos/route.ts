import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Todo, NewToDo } from '@/types/Todo'
import logger from '@/logger'

function validateData(data: any): data is NewToDo {
  return (
    typeof data.user_id === 'string' &&
    typeof data.content === 'string' &&
    (typeof data.due_date === 'string' ||
      data.due_date === null ||
      data.due_date === undefined) &&
    (typeof data.color === 'string' ||
      data.color === 'default-color' ||
      data.color === undefined) &&
    (typeof data.category_id === 'number' ||
      data.category_id === null ||
      data.category_id === undefined) &&
    typeof data.completed === 'boolean'
  )
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    if (req.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            Allow: 'GET'
          }
        }
      )
    }
  } catch (error) {
    logger.error(`GET all tasks error: ${error}`)
  }

  try {
    const { data: todos, error } = await supabase.from('todos').select()

    if (error) throw new Error(error.message)

    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    logger.error('Error fetching data', error)
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'POST'
        }
      }
    )
  }

  const todo: NewToDo = await req.json()
  todo.user_id = data?.user?.id

  if (!validateData(todo)) {
    return new Response(JSON.stringify({ error: 'Invalid data format' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const { data, error } = await supabase.from('todos').insert([todo])
    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Todo added successfully', data }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    logger.error('Error inserting data', error)
    return new Response(JSON.stringify({ error: 'Error inserting data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export async function PUT(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  if (req.method !== 'PUT') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'PUT'
        }
      }
    )
  }

  const todo: Todo = await req.json()
  const id = todo.id
  todo.user_id = data?.user?.id

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Todo ID is required for updating' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  if (!validateData(todo)) {
    return new Response(JSON.stringify({ error: 'Invalid data format' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const { error } = await supabase.from('todos').update(todo).match({ id })

    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Todo updated successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    logger.error('Error updating data', error)
    return new Response(JSON.stringify({ error: 'Error updating data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  if (req.method !== 'DELETE') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'DELETE'
        }
      }
    )
  }

  const requestUrl = new URL(req.url)
  const todoId = requestUrl.searchParams.get('id')

  if (!todoId) {
    return new Response(
      JSON.stringify({ error: 'A valid todo ID is required for deletion' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .match({ id: todoId })

    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Todo deleted successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    logger.error('Error deleting data', error)
    return new Response(JSON.stringify({ error: 'Error deleting data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
