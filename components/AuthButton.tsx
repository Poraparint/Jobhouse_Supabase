import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    <div className="flex items-center gap-9">
      {user.email}
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md border hover:bg-white hover:text-[#1F3A93] duration-300">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-5 flex rounded-md border hover:bg-white hover:text-[#1F3A93] duration-300"
    >
      Login
    </Link>
  );
}
