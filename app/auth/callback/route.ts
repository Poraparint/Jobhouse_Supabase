import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/protected";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error("Error exchanging code for session:", error);
    }
  } else {
    console.error("No code provided in URL.");
  }

  // Fallback in case of error
  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
  );
}
