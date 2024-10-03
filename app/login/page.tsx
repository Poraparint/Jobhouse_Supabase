import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/forms/submit-button";
import Loginwith from "@/components/Loginwith";
import { encodedRedirect } from "@/utils/utils";
import { Label } from "@/components/forms/label";


export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return encodedRedirect("error", "/login", "Could not authenticate user");
    }
    return redirect("/protected");
  };
  
  

  return (
    <div className="Page bg-white border border-secondary w-[80%] max-lg:w-[60%] rounded-lg shadow-xl">
      <div className="flex justify-between m-6 gap-7 rounded-lg">
        <div className="w-full flex flex-col text-center">
          <Link
            href="/Signup"
            className="text-secondary items-center w-[40%] flex group text-xm max-md:text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            สมัครสมาชิก
          </Link>
          <h1 className="text-4xl font-semibold text-secondary my-8">
            เข้าสู่ระบบ
          </h1>
          <form className="flex flex-col justify-center gap-6 py-5 mx-2 mt-6 items-center">
            <label className="input border-secondary flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#3D3D3D"
                className="h-4 w-4"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                name="email"
                className="grow"
                placeholder="Email"
                required
              />
              <div className="flex justify-between items-center">
                <Link
                  className="text-sm text-blue-600 underline"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
            </label>
            <label className="input border-secondary flex items-center gap-2 w-full mb-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#3D3D3D"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="••••••••"
                name="password"
                required
              />
            </label>
            <SubmitButton formAction={signIn} pendingText="Signing In...">
              <div className="btn btn-primary font-normal text-white px-9">
                เข้าสู่ระบบ
              </div>
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>

          <Loginwith />
        </div>
        <div className="border max-lg:hidden w-full opacity-60 rounded-lg duration-300 hover:opacity-80">
          <Image
            src="/ArunTemple.jpeg"
            width={800}
            height={500}
            alt="ArunTemple"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
