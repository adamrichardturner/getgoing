// Import statements remain the same
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { PreFormTodo } from '@/types/Todo'

// Validate for updating data
function validateTodoData(todo: PreFormTodo): PreFormTodo {
  // Clone the object to avoid direct mutations
  const validatedTodo = { ...todo }

  // Check if category_id is 999 and transform it to null
  if (validatedTodo.category_id === 999) {
    validatedTodo.category_id = null
  }

  return validatedTodo
}

export async function PUT(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const updatedData = await req.json()

  console.log(`updated data `, updatedData)

  const { id } = updatedData

  try {
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: 'Todo ID is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }
    console.log(`id is ${id}`)

    const { error } = await supabase.from('todos').update({ id }).eq('id', id)
  } catch (error) {
    console.error(error)
  }

  const { data, error } = await supabase
    .from('todos')
    .update(validateTodoData(updatedData))
    .eq('id', id)

  console.log('response is ', data)

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return new NextResponse(JSON.stringify(updatedData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
