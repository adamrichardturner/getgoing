import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'POST',
        },
      }
    )
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error }: any = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })

  console.log(`Server data on github: `, data)

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Could not authenticate user' }),
      {
        status: 401, // Unauthorized
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  if (data.user.aud === 'authenticated') {
    return new Response(JSON.stringify(data.user), {
      status: 200, // OK
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
