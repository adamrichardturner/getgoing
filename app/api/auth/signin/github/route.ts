import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

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

  console.log(`Server data on github: `, error)

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

  if (data.url.length > 0) {
    const code = data.url
    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect('/')
  }
}
