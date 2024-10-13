// src/app/auth/callback.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/client";

const AuthCallback = () => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const code = Array.isArray(router.query.code)
      ? router.query.code[0]
      : router.query.code; // Ensure code is a string

    if (code) {
      const handleSignIn = async () => {
        // Sign in with the received code
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `http://jobhouse-supabase-p1awpyldv-poraparints-projects.vercel.app/auth/callback`,
            queryParams: {
              code: code, // Send the code back to Supabase
            },
          },
        });

        if (error) {
          console.error("Error during sign-in:", error);
          // Handle error (you could redirect to an error page or show a message)
        } else {
          // Redirect to a desired page after successful sign-in
          router.push("/"); // Change to your intended page
        }
      };

      handleSignIn();
    }
  }, [router]);

  return <div>Signing you in...</div>; // Show a loading message while signing in
};

export default AuthCallback;
