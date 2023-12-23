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
          Allow: 'GET',
        },
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
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching categories', error)
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: userData, error: userError } = await supabase.auth.getUser()
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

  if (!userData?.user?.id) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const userId = userData.user.id

  // Check if the user already has 12 categories
  const { data: categoryData, error: countError } = await supabase
    .from('categories')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)

  if (countError) {
    console.error('Error fetching category count:', countError)
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const count = categoryData.length

  if (count >= 8) {
    return new Response(
      JSON.stringify({ error: 'User cannot have more than 12 categories' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  // Continue to create a new category
  const category: NewCategory = await req.json()
  category.user_id = userId

  try {
    const { data, error } = await supabase.from('categories').insert([category])
    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Category created successfully', data }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error creating category', error)
    return new Response(JSON.stringify({ error: 'Error creating category' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
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
          Allow: 'PUT',
        },
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
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error updating category', error)
    return new Response(JSON.stringify({ error: 'Error updating category' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export async function PATCH(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  if (req.method !== 'PATCH') {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'PATCH',
        },
      }
    )
  }

  const { id, name }: { id: number; name: string } = await req.json()

  console.log('ID and name in api are ')
  console.log(id, name)

  if (!id || !name) {
    return new Response(
      JSON.stringify({
        error: 'A valid category ID and new name are required',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  try {
    const { error } = await supabase
      .from('categories')
      .update({ name: name })
      .match({ id })

    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: 'Category updated successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error updating category', error)
    return new Response(JSON.stringify({ error: 'Error updating category' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
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
          Allow: 'DELETE',
        },
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
          'Content-Type': 'application/json',
        },
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
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error deleting category', error)
    return new Response(JSON.stringify({ error: 'Error deleting category' }))
  }
}
