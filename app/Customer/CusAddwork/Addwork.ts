"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const addWork = async (formData: FormData) => {
  const work_name = formData.get("work_name") as string;
  const work_detail = formData.get("work_detail") as string;
  const work_ex = formData.get("work_ex") as string;
  const work_budget = formData.get("work_budget") as string;
  const work_catagory = formData.get("work_catagory") as string;
  const work_deadline = formData.get("work_deadline") as string;

  const supabase = createClient();

  // ดึงข้อมูลผู้ใช้ที่เข้าสู่ระบบ
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User is not authenticated");
    return false;
  }

  // ตรวจสอบรูปแบบของวันที่
  if (!isValidDate(work_deadline)) {
    console.log("Invalid date format for work_deadline");
    return false;
  }

  // ฟังก์ชันช่วยตรวจสอบวันที่
  function isValidDate(dateString: string) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // รูปแบบ YYYY-MM-DD
    return dateString.match(regex) !== null;
  }

  const { data, error } = await supabase.from("cuswork").insert([
    {
      work_name,
      work_detail,
      work_ex,
      work_budget,
      work_catagory,
      work_deadline,
      user_id: user.id, // เพิ่ม user_id ในข้อมูลที่แทรก
    },
  ]);

  if (error) {
    console.log("Found some error", error);
    return false;
  }

  return true;
};
