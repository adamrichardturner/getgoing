import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin)
}

export async function handleGoogleCallback(req: Request) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code') // Retrieve authorization code

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { error, session } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error(error)
      return NextResponse.redirect('/') // Redirect to login page if session is not valid
    }

    cookies.set('supabase_session', session.id, {
      secure: true,
      httpOnly: true,
    }) // Store session ID in a cookie

    // Redirect to the intended page or home page
    return NextResponse.redirect('/authenticated-page')
  }

  return NextResponse.redirect('/') // Redirect to login page if no code is provided
}
