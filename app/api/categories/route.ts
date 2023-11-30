import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NewCategory } from '@/types/Category'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

// Export a named function for the GET HTTP method
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Check if the HTTP method is GET, otherwise return a 405 Method Not Allowed
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    // Fetch categories for logged in user
    const { data: todos, error } = await supabase.from('categories').select()
    if (error) throw new Error(error.message)
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error fetching categories', error)
    res.status(500).json({ error: 'Error fetching data' })
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const category: NewCategory = req.body

  try {
    const { data, error } = await supabase.from('categories').insert([category])
    if (error) throw new Error(error.message)

    res.status(200).json({ message: 'Category created successfully', data })
  } catch (error) {
    console.error('Error creating category', error)
    res.status(500).json({ error: 'Error creating category' })
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const { id, ...categoryData }: { id: number } & NewCategory = req.body

  try {
    const { error } = await supabase
      .from('categories')
      .update(categoryData)
      .match({ id })
    if (error) throw new Error(error.message)

    res.status(200).json({ message: 'Category updated successfully' })
  } catch (error) {
    console.error('Error updating category', error)
    res.status(500).json({ error: 'Error updating category' })
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const categoryId = req.query.id

  if (!categoryId || typeof categoryId !== 'string') {
    return res
      .status(400)
      .json({ error: 'A valid category ID is required for deletion' })
  }

  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .match({ id: categoryId })
    if (error) throw new Error(error.message)

    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category', error)
    res.status(500).json({ error: 'Error deleting category' })
  }
}
