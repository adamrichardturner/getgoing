import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Export a named function for the GET HTTP method
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Check if the HTTP method is GET, otherwise return a 405 Method Not Allowed
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Fetch todos from the 'todos' table for the logged-in user
  const { data: todos, error } = await supabase.from('todos').select()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return new Response(JSON.stringify(todos), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
