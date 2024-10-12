"use server";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

// ฟังก์ชันช่วยสำหรับการจัดการข้อผิดพลาด
const handleError = (error: any, message: string) => {
  console.error(message, error);
  return null;
};

// ฟังก์ชัน addWork: สำหรับเพิ่มงานใหม่ในฐานข้อมูล
export const addWork = async (formData: FormData) => {
  const work_name = formData.get("work_name") as string;
  const work_detail = formData.get("work_detail") as string;
  const work_budget = formData.get("work_budget") as string;
  const work_catagory = formData.get("work_catagory") as string;
  const work_deadline = (formData.get("work_deadline") as string) || "-";
  const work_Exdetail = formData.get("work_Exdetail") as string;
  const supabase = createClient();

  // รับข้อมูลผู้ใช้
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return handleError(userError, "Error getting user");
  }

  const postFolder = uuidv4();
  const userFolder = user.id;
  const fileUrls: string[] = [];

  // Handle main image upload separately
  const mainImgFile = formData.get("work_mainimg") as File;
  let mainImgUrl = "";

  const uploadPromises = [];

  if (mainImgFile) {
    const mainImgFileName = `${uuidv4()}${mainImgFile.name.substring(
      mainImgFile.name.lastIndexOf(".")
    )}`;
    const mainImgFilePath = `${userFolder}/${postFolder}/${mainImgFileName}`;

    uploadPromises.push(
      supabase.storage
        .from("work_mainimg")
        .upload(mainImgFilePath, mainImgFile)
        .then(() => {
          const { data: publicUrlData } = supabase.storage
            .from("work_mainimg")
            .getPublicUrl(mainImgFilePath);
          mainImgUrl = publicUrlData.publicUrl;
        })
    );
  }

  // Handle example files
  const fileKeys = Array.from(formData.keys()).filter((key) =>
    key.startsWith("work_ex_")
  );

  fileKeys.forEach((key) => {
    const file = formData.get(key) as File;
    const uniqueFileName = `${uuidv4()}${file.name.substring(
      file.name.lastIndexOf(".")
    )}`;
    const filePath = `${userFolder}/${postFolder}/${uniqueFileName}`;

    uploadPromises.push(
      supabase.storage
        .from("work_ex")
        .upload(filePath, file)
        .then(() => {
          const { data: publicUrlData } = supabase.storage
            .from("work_ex")
            .getPublicUrl(filePath);
          fileUrls.push(publicUrlData.publicUrl);
        })
    );
  });

  try {
    await Promise.all(uploadPromises);
  } catch (uploadError) {
    return handleError(uploadError, "Upload error");
  }

  // Insert work into database
  const { data, error } = await supabase
    .from("FreelanceWork")
    .insert([
      {
        work_name,
        work_detail,
        work_ex: fileUrls,
        work_mainimg: mainImgUrl,
        work_Exdetail,
        work_budget,
        work_catagory,
        work_deadline,
        user_id: user.id,
      },
    ])
    .select("id")
    .single();

  if (error) {
    return handleError(error, "Error inserting work");
  }

  return data.id;
};
