import DeployButton from "@/components/DeployButton";
import { createClient } from "@/utils/supabase/server";
import Home from "@/components/Home";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full">
      <div className="Page w-full flex flex-col gap-20">
        <Home />
      </div>

      
        <Footer />
      
    </div>
  );
}
