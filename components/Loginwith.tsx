"use client"
import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client"; 

export default function Loginwith() {

  const signInWithGoogle = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.error(error);
      alert("Could not authenticate with GitHub");
    }
  };

  return (
    <div className="flex flex-col items-center text-secondary w-4/6 self-center my-5">
      <div
        onClick={signInWithGoogle}
        className="py-1 cursor-pointer gap-3 px-2 border border-secondary rounded-md flex items-center justify-evenly hover:bg-[#f0f0f0] duration-300"
      >
        <Image
          src="/google.png"
          alt="Profile"
          className="rounded-full "
          width={35}
          height={35}
        />
        <p>Sign in with Google</p>
      </div>
    </div>
  );
}
