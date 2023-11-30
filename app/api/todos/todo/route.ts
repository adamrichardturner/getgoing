import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const requestUrl = new URL(req.url)
  const todoId = requestUrl.searchParams.get('todoId')

  if (!todoId) {
    return new Response(JSON.stringify({ error: 'Todo ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const { data: todo, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', todoId)
      .single()

    if (error) throw new Error(error.message)

    return new Response(JSON.stringify(todo), {
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
