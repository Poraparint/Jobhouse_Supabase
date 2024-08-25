import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };


  return user ? (
    <div className="flex items-center gap-11">
      <div className="max-lg:text-xs">
        <p>สมัครเป็นฟรีแลนซ์</p>
      </div>
      <Link href="/Customer/C_Pro_Edit">
        <Image
          src="/De_Profile.jpeg"
          alt="Profile"
          className="border border-primary rounded-full hover:border-white duration-300"
          width={40}
          height={40}
        />
      </Link>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md border hover:bg-white hover:text-primary duration-300">
          Logout
        </button>
      </form>
    </div>
  ) : (
      <div className="flex gap-3">
        <Link
      href="/login"
      className="py-2 px-5 flex rounded-md border hover:bg-white hover:text-primary duration-300"
    >
      Login
      </Link>
      <Link
      href="/Signup"
      className="py-2 px-5 flex rounded-md border hover:bg-white hover:text-primary duration-300"
    >
      Sign Up
    </Link>
      </div>
    
  );
}
