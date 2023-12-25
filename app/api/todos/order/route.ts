import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import logger from '@/logger'

export async function PUT(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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

  // Assuming the request body contains an array of todo IDs in the new order
  const newOrder: number[] = await req.json()

  try {
    // Update the 'order_index' of each todo in the database
    for (let i = 0; i < newOrder.length; i++) {
      const todoId = newOrder[i]
      const orderIndex = i // The index in the array represents the new order

      await supabase
        .from('todos')
        .update({ order_index: orderIndex })
        .eq('id', todoId)
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
    return new NextResponse(JSON.stringify({ error: 'Error updating order' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
