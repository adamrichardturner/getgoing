import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import logger from '@/logger'

export async function PUT(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (req.method !== 'PUT') {
    return new NextResponse(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'PUT',
        },
      }
    )
  }

  const updatedTodos = await req.json()

  try {
    if (!user) {
      throw new Error('User not authenticated')
    }

    for (const todo of updatedTodos) {
      const { error } = await supabase
        .from('todos')
        .update({ order_index: todo.order_index })
        .match({ id: todo.id, user_id: user.id })

      if (error) {
        throw new Error(error.message)
      }
    }

    return new NextResponse(
      JSON.stringify({ message: 'Order updated successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    logger.error('Error updating todo order', error)
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
