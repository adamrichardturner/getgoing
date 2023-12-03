// Import statements remain the same
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default async function Page({
  params,
  req,
  res
}: {
  params: { slug: string }
  req: NextRequest
  res: NextResponse
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const id = req
  console.log(`HERE IS THE ID: ${id}`)

  if (!id) {
    return new NextResponse(JSON.stringify({ error: 'Todo ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // Parse the request body to get the updated data
  const updatedData = await req.json()

  // Perform the update operation
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
