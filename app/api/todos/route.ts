import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { Todo, NewToDo, PreFormTodo } from "@/types/Todo"
import logger from "@/logger"

function validateData(data: any): data is NewToDo {
  return typeof data.user_id === "string" && typeof data.content === "string"
}

function validateEditedTodo(todo: PreFormTodo): PreFormTodo {
  const validatedTodo = { ...todo }

  if (validatedTodo.category_id === 999) {
    validatedTodo.category_id = null
  }

  return validatedTodo
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    if (req.method !== "GET") {
      return new Response(
        JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            Allow: "GET",
          },
        }
      )
    }
  } catch (error) {
    logger.error(`GET all tasks error: ${error}`)
  }

  try {
    const { data: todos, error } = await supabase.from("todos").select()

    if (error) throw new Error(error.message)

    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    logger.error("Error fetching data", error)
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          Allow: "POST",
        },
      }
    )
  }

  const todo: NewToDo = await req.json()
  todo.user_id = data?.user?.id || null

  if (!validateData(todo)) {
    return new Response(JSON.stringify({ error: "Invalid data format" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  try {
    const { data, error } = await supabase.from("todos").insert([todo]).select()
    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: "Todo added successfully", data }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    logger.error("Error inserting data", error)
    return new Response(JSON.stringify({ error: "Error inserting data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export async function PUT(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  if (req.method !== "PUT") {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          Allow: "PUT",
        },
      }
    )
  }

  const todo: Todo = await req.json()
  const id: number = todo.id

  if (id === undefined || isNaN(id)) {
    logger.error("id undefined or isNan")
  }

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Todo ID is required for updating" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  if (!validateData(todo)) {
    return new Response(JSON.stringify({ error: "Invalid data format" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  try {
    const { data, error } = await supabase
      .from("todos")
      .update(todo)
      .eq("id", id)
      .select()

    if (error) throw new Error(error.message)

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    logger.error("Error updating data", error)
    return new Response(JSON.stringify({ error: "Error updating data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export async function PATCH(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const updatedData = await req.json()

  const { id } = updatedData

  try {
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Todo ID is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    console.log(`id is ${id}`)

    const { error } = await supabase.from("todos").update({ id }).eq("id", id)
  } catch (error) {
    console.error(error)
  }

  const { data, error } = await supabase
    .from("todos")
    .update(validateEditedTodo(updatedData))
    .eq("id", id)

  console.log("response is ", data)

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return new NextResponse(JSON.stringify(updatedData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  if (req.method !== "DELETE") {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          Allow: "DELETE",
        },
      }
    )
  }

  const requestUrl = new URL(req.url)
  console.log(`Request URL: ${requestUrl}`)
  const todoId = requestUrl.searchParams.get("id")
  console.log(`Todo ID: ${todoId}`)

  if (!todoId) {
    return new Response(
      JSON.stringify({ error: "A valid todo ID is required for deletion" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const { error } = await supabase
      .from("todos")
      .delete()
      .match({ id: todoId })

    if (error) throw new Error(error.message)

    return new Response(
      JSON.stringify({ message: "Todo deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    logger.error("Error deleting data", error)
    return new Response(JSON.stringify({ error: "Error deleting data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
