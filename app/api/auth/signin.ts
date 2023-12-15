import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(new URL('/login?message=Could not authenticate user', req.url));
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
