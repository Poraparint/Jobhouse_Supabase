// FAddwork.ts
"use server";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';

export const addWork = async (formData: FormData) => {
    const work_name = formData.get("work_name") as string;
    const work_detail = formData.get("work_detail") as string;
    const work_budget = formData.get("work_budget") as string;
    const work_catagory = formData.get("work_catagory") as string;
    const work_deadline = formData.get("work_deadline") as string || "-";
    const work_Exdetail = formData.get("work_Exdetail") as string;
    const supabase = createClient();

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error("Error getting user:", userError);
        return null;
    }

    if (!user) {
        console.log("User is not authenticated");
        return null;
    }

    // Create a unique folder for this post
    const postFolder = uuidv4();  // Or use Date.now() for a timestamp-based folder name
    const userFolder = user.id;

    // Handle file uploads
    const fileKeys = Array.from(formData.keys()).filter(key => key.startsWith("work_ex_"));
    const fileUrls: string[] = [];

    for (const key of fileKeys) {
        const file = formData.get(key) as File;
        const uniqueFileName = `${uuidv4()}${file.name.substring(file.name.lastIndexOf('.'))}`;
        const filePath = `${userFolder}/${postFolder}/${uniqueFileName}`;

        const { error: uploadError } = await supabase.storage
            .from('work_ex')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return null;
        }
        fileUrls.push(filePath);
    }

    // Insert the new work entry
    const { data, error } = await supabase
        .from("FreelanceWork")
        .insert([
            {
                work_name,
                work_detail,
                work_ex: fileUrls,
                work_Exdetail,
                work_budget,
                work_catagory,
                work_deadline,
                user_id: user.id,
            },
        ])
        .select('id')
        .single();

    if (error) {
        console.error("Error inserting work:", error);
        return null;
    }

    return data.id;  // Return the new work ID
};
