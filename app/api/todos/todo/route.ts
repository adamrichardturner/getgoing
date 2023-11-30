import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Extract todoId from the query string
  console.log(req.query)
  const { todoId } = req.query

  if (!todoId) {
    return res.status(400).json({ error: 'Todo ID is required' })
  }

  try {
    const { data: todo, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', todoId)
      .single()

    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    if (error) {
      return new Response(JSON.stringify({ error: error }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
}
