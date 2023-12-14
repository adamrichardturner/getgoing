// login/authApi.ts
import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
  } else {
    redirect("/");
  }
}

export async function signUp(email: string, password: string) {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error("Could not authenticate user");
  }

  // Perform a redirect using the new App Router syntax
  redirect("/login?message=Check email to continue sign in process");
}
