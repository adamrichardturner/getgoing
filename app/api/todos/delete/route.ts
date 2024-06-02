import { NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import logger from "@/logger"

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
  const action = requestUrl.searchParams.get("action")

  if (action === "delete_completed") {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .match({ completed: true })

      if (error) throw new Error(error.message)

      return new Response(
        JSON.stringify({ message: "Completed todos deleted successfully" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (error) {
      logger.error("Error deleting completed todos", error)
      return new Response(
        JSON.stringify({ error: "Error deleting completed todos" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
  }

  return new Response(JSON.stringify({ error: "Invalid action" }), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
