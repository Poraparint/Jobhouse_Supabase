"use client"
import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client"; 

export default function Loginwith() {

  const signInWithGithub = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.error(error);
      alert("Could not authenticate with GitHub");
    }
  };

  return (
    <div className="my-5 flex justify-center gap-4">
      <Image
        src="/Google.svg"
        alt="Profile"
        className="rounded-full cursor-pointer"
        width={40}
        height={40}
        onClick={() => alert("Google sign-in not implemented")} // ใส่ฟังก์ชันของ Google ตามที่ต้องการ
      />
      <Image
        src="/Facebook.svg"
        alt="Profile"
        className="rounded-full cursor-pointer"
        width={40}
        height={40}
        onClick={() => alert("Facebook sign-in not implemented")} // ใส่ฟังก์ชันของ Facebook ตามที่ต้องการ
      />
      <Image
        src="/Github.svg"
        alt="Profile"
        className="rounded-full cursor-pointer"
        width={40}
        height={40}
        onClick={signInWithGithub} // ใช้ฟังก์ชัน signInWithGithub
      />
    </div>
  );
}
