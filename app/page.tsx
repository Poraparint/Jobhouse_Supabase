import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import Home from "@/components/Home";
import Footer from "@/components/Footer";


export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="w-full">
      <div className="Page w-full flex flex-col gap-20">
        {isSupabaseConnected ? <Home /> : <ConnectSupabaseSteps />}
        <p>dup</p>
        <p>dup</p>
        <p>dup</p>
        <p>dup</p>
        <p>dup</p>

        <p>dup</p>

        <p>dup</p>
      </div>
      <Footer />
    </div>
  );
}
