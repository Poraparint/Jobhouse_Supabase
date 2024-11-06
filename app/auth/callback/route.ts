import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/protected";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(
        `https://jobhouse-supabase.vercel.app${next}`
      );
    }
  }

  // ถ้าไม่สามารถเปลี่ยนเส้นทางได้ให้แสดงข้อผิดพลาด
  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
  );
}
