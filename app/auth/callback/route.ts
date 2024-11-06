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
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      const finalRedirectURL = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`;

      return NextResponse.redirect(finalRedirectURL);
    }
  }

  // ส่งข้อความแสดงข้อผิดพลาดหากเกิดปัญหาในการแลกเปลี่ยนโค้ดหรือเปลี่ยนเส้นทางไม่ได้
  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
  );
}
