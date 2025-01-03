"use server";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData: FormData) {
  try {
    const username = formData.get("username") as string | null;
    const userdetails = formData.get("userdetails") as string | null;
    const fb_url = formData.get("fb_url") as string | null;
    const ig_url = formData.get("ig_url") as string | null;
    const line_url = formData.get("line_url") as string | null;
    const avatar = formData.get("profile") as File | null;
    const bg = formData.get("bg") as File | null;

    const supabase = createClient();

    // ดึงข้อมูลผู้ใช้จาก Supabase Auth
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error getting user:", userError?.message);
      return { message: "User not authenticated", error: userError };
    }

    // จัดเตรียมข้อมูลที่จะอัปเดต
    const updates: { [key: string]: string | null } = {};
    if (username) updates.username = username;
    if (userdetails) updates.userdetails = userdetails;
    if (fb_url) updates.fb_url = fb_url;
    if (ig_url) updates.ig_url = ig_url;
    if (line_url) updates.line_url = line_url;

    // อัปโหลดรูปโปรไฟล์ถ้ามีการเลือกไฟล์
    if (avatar) {
      const filePath = `${user.id}/avatar`;

      const { error: uploadError } = await supabase.storage
        .from("User_Profile")
        .upload(filePath, avatar, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error uploading file:", uploadError.message);
        return { message: "Cannot upload avatar", error: uploadError };
      }

      // รับ URL ของรูปภาพที่อัปโหลด
      const { data: publicUrlData } = supabase.storage
        .from("User_Profile")
        .getPublicUrl(filePath);

      const avatarUrl = publicUrlData.publicUrl;
      updates.avatar_url = avatarUrl;
    }

    // Upload background image if provided
    if (bg) {
      const bgPath = `${user.id}/bg`;

      const { error: bgUploadError } = await supabase.storage
        .from("User_Profile")
        .upload(bgPath, bg, { cacheControl: "3600", upsert: true });

      if (bgUploadError) {
        console.error("Error uploading background:", bgUploadError.message);
        return {
          message: "Cannot upload background image",
          error: bgUploadError,
        };
      }

      const { data: bgUrlData } = supabase.storage
        .from("User_Profile")
        .getPublicUrl(bgPath);

      updates.bg_url = bgUrlData.publicUrl;
    }

    // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล Supabase
    if (Object.keys(updates).length > 0) {
      const { data: updateData, error: updateError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select();

      if (updateError) {
        console.error("Error updating profile:", updateError.message);
        return { message: "Cannot update profile", error: updateError };
      }

      console.log("Profile updated successfully", updateData);
      return { message: "Profile updated successfully", data: updateData };
    } else {
      return { message: "Nothing to update" };
    }
  } catch (error) {
    console.log("Server error:", error);
    return { message: "Server error", error };
  }
}
