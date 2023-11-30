import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NewToDo } from '@/types/Todo'

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

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
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
    console.error('Error fetching data', error)
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
    console.error('Error inserting data', error)
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

  const { id, ...todo }: { id: number } & NewToDo = await req.json()

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
    console.error('Error updating data', error)
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
    console.error('Error deleting data', error)
    return new Response(JSON.stringify({ error: 'Error deleting data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
