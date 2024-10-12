"use client";
import { createClient } from "@/utils/supabase/client";
import { signIn } from "./action";
import Image from "next/image";
import Link from "next/link";

// Components
import { SubmitButton } from "@/components/forms/submit-button";

function SignInPage({ searchParams }: { searchParams: { message: string } }) {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="Page">
      {/* Back to Sign-Up Link */}
      <Link
        href="/sign-up"
        className="absolute top-3 left-3 z-[2] flex items-center space-x-2 border rounded-full px-4 py-2 bg-white hover:bg-gray-200 transition-colors"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Sign Up</span>
      </Link>

      {/* Sign-In Form Container */}
      <div className="grow bg-gray-100 backdrop-blur-sm rounded-3xl py-16 px-10 shadow-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          SIGN IN
        </h2>

        <form className="flex flex-col gap-6 text-gray-700">
          {/* Email */}
          <label className="flex items-center gap-4 px-4 py-3 bg-white border rounded-3xl shadow-sm">
            <i className="fa-solid fa-envelope text-gray-400"></i>
            <input
              type="email"
              name="email"
              className="flex-grow outline-none text-sm"
              placeholder="Enter your email"
              required
            />
          </label>

          {/* Password */}
          <label className="flex items-center gap-4 px-4 py-3 bg-white border rounded-3xl shadow-sm">
            <i className="fa-solid fa-lock text-gray-400"></i>
            <input
              type="password"
              name="password"
              className="flex-grow outline-none text-sm"
              placeholder="Enter your password"
              required
            />
          </label>

          {/* Error Message (if any) */}
          {searchParams?.message && (
            <p className="text-red-500 text-xs px-2 pt-2">
              {searchParams.message}
            </p>
          )}

          {/* Forgot Password & Submit Button */}
          <div className="flex flex-col gap-5">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
            <SubmitButton
              formAction={signIn}
              pendingText="Signing In..."
              className="w-40"
            >
              Sign In
            </SubmitButton>
          </div>
        </form>

        {/* Create Account */}
        <div className="text-center mt-8">
          <Link
            href="/sign-up"
            className="text-sm text-gray-700 font-bold hover:underline"
          >
            Create Your Account <i className="fa-solid fa-arrow-right ml-1"></i>
          </Link>
        </div>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <div className="flex justify-center">
          <button
            onClick={signInWithGoogle}
            className="flex items-center text-secondary gap-3 px-6 py-3 bg-white border rounded-full shadow-sm hover:bg-gray-100 transition"
          >
            <div className="relative w-7 h-7 rounded-full">
              <Image
                className="rounded-full"
                src="/google.png"
                alt="Avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <span className="font-semibold text-sm">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
