import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Home from "@/components/Home";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="Page">
      <div className="">
        <nav className="BoxShadow w-full bg-primary opacity-90 text-white items-center py-2 flex justify-between px-5 fixed left-0 top-0">
          <div className="Nav-one h-[100%] flex">
            <Link href="/">
              <Image src="/Job.png" width={150} height={100} alt="Logo" />
            </Link>
          </div>
          <div className="flex justify-between items-center gap-5 p-3 text-sm">
            <Link href="/User/Jobboard">
              <button className="py-2 px-4 rounded-md bg-[white] hover:bg-[#d7d7d7] text-primary  duration-300">
                บอร์ดประกาศงาน
              </button>
            </Link>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Home />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <FetchDataSteps />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <DeployButton />
      </footer>
    </div>
  );
}
