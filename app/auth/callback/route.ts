import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Verify the session by fetching the user
      const { data: user, error: sessionError } = await supabase.auth.getUser();

      if (sessionError) {
        console.error(
          "User session verification failed:",
          sessionError.message
        );
        return NextResponse.json(
          {
            message:
              "Failed to establish session. Please try logging in again.",
          },
          { status: 500 }
        );
      }

      // Redirect to protected route if session is established
      return NextResponse.redirect(`${origin}/protected`);
    } else {
      console.error("Session exchange error:", error.message);
    }
  }

  return NextResponse.json(
    { message: "Authentication failed. Please try again." },
    { status: 500 }
  );
}

