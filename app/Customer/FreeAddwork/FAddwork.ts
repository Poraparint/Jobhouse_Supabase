// FAddwork.ts
"use server";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';

export const addWork = async (formData: FormData) => {
  const work_name = formData.get("work_name") as string;
  const work_detail = formData.get("work_detail") as string;
  const work_budget = formData.get("work_budget") as string;
  const work_catagory = formData.get("work_catagory") as string;
  const work_deadline = (formData.get("work_deadline") as string) || "-";
  const work_Exdetail = formData.get("work_Exdetail") as string;
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error getting user:", userError);
    return null;
  }

  const postFolder = uuidv4();
  const userFolder = user.id;
  const fileUrls: string[] = [];

  // Handle main image upload separately
  const mainImgFile = formData.get("work_mainimg") as File;
  let mainImgUrl = "";

  if (mainImgFile) {
    const mainImgFileName = `${uuidv4()}${mainImgFile.name.substring(
      mainImgFile.name.lastIndexOf(".")
    )}`;
    const mainImgFilePath = `${userFolder}/${postFolder}/${mainImgFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("work_mainimg")
      .upload(mainImgFilePath, mainImgFile);

    if (uploadError) {
      console.error("Main image upload error:", uploadError);
      return null;
    }

    // Get public URL for the main image
    const { data: publicUrlData } = supabase.storage
      .from("work_mainimg")
      .getPublicUrl(mainImgFilePath);

    mainImgUrl = publicUrlData.publicUrl; // Save the public URL
  }

  // Handle example files
  const fileKeys = Array.from(formData.keys()).filter((key) =>
    key.startsWith("work_ex_")
  );

  for (const key of fileKeys) {
    const file = formData.get(key) as File;
    const uniqueFileName = `${uuidv4()}${file.name.substring(
      file.name.lastIndexOf(".")
    )}`;
    const filePath = `${userFolder}/${postFolder}/${uniqueFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("work_ex")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    // Get public URL for the example files
    const { data: publicUrlData } = supabase.storage
      .from("work_ex")
      .getPublicUrl(filePath);

    fileUrls.push(publicUrlData.publicUrl); // Save the public URL
  }

  // Insert work into database
  const { data, error } = await supabase
    .from("FreelanceWork")
    .insert([
      {
        work_name,
        work_detail,
        work_ex: fileUrls,
        work_mainimg: mainImgUrl, // Store the main image public URL
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
    console.error("Error inserting work:", error);
    return null;
  }

  return data.id;
};  