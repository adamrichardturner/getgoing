import { NextRequest } from "next/server"
import { headers, cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: NextRequest) {
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

  const formData = await req.json()

  const origin = headers().get("origin")
  const email = formData.email
  const password = formData.password
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  })

  if (error) {
    return new Response(
      JSON.stringify({ error: "Could not authenticate user" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } else {
    return new Response(
      JSON.stringify({ message: "Check email to continue sign in process" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
