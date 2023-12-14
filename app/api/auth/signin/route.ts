// app/api/auth/signin.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

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
      },
    );
  }

  const formData = await req.json();
  const email = formData.email;
  const password = formData.password;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Could not authenticate user' }),
      {
        status: 401, // Unauthorized
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  if (data.user.aud === 'authenticated') {
    return new Response(
      JSON.stringify({ success: true, message: 'User authenticated successfully' }),
      {
        status: 200, // OK
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
