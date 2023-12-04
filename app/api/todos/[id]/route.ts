// Import statements remain the same
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const updatedData = await req.json()

  const { id } = updatedData

  try {
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: 'Todo ID is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    const { error } = await supabase.from('todos').update({ id }).eq('id', id)
  } catch (error) {
    console.error(error)
  }

  const { data, error } = await supabase
    .from('todos')
    .update(updatedData)
    .eq('id', id)

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
