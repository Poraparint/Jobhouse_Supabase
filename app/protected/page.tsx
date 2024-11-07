// app/ProtectedPage.tsx

import { redirect } from "next/navigation"; // เอาไว้ใช้สำหรับการนำทาง
import { createClient } from "@/utils/supabase/server"; // นำเข้า supabase client
import OnboardingSteps from "@/components/OnboardingSteps"; // นำเข้า OnboardingSteps

// สร้าง Component แบบ Server Component
export default async function ProtectedPage() {
  const supabase = createClient(); // สร้าง Supabase client

  const {
    data: { user },
  } = await supabase.auth.getUser(); // ตรวจสอบผู้ใช้

  // ถ้าไม่มีผู้ใช้ ให้ redirect ไปยังหน้า login
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full Page">
      <OnboardingSteps />
    </div>
  );
}
