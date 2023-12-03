import { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NewCategory } from '@/types/Category'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'GET'
        }
      }
    )
  }

  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select()
    if (error) throw new Error(error.message)
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error fetching categories', error)
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'POST'
        }
      }
    )
  }

  const category: NewCategory = await req.json()
  category.user_id = data?.user?.id

  try {
    const { data, error } = await supabase.from('categories').insert([category])
    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Category created successfully', data }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error creating category', error)
    return new Response(JSON.stringify({ error: 'Error creating category' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export async function PUT(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  if (req.method !== 'PUT') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'PUT'
        }
      }
    )
  }

  const { id, ...categoryData }: { id: number } & NewCategory = await req.json()

  try {
    const { error } = await supabase
      .from('categories')
      .update(categoryData)
      .match({ id })
    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Category updated successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error updating category', error)
    return new Response(JSON.stringify({ error: 'Error updating category' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  if (req.method !== 'DELETE') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'DELETE'
        }
      }
    )
  }

  const requestUrl = new URL(req.url)
  const categoryId = requestUrl.searchParams.get('id')

  if (!categoryId) {
    return new Response(
      JSON.stringify({ error: 'A valid category ID is required for deletion' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .match({ id: categoryId })
    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Category deleted successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error deleting category', error)
    return new Response(JSON.stringify({ error: 'Error deleting category' }))
  }
}
