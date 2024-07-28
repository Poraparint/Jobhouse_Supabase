import DeployButton from "../components/DeployButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
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
        <Home />
        {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        <p>dup</p>
        <p>dup</p>
        <p>dup</p>
        <p>dup</p>
        <p>dup</p>

        <p>dup</p>
        <DeployButton />
        <p>dup</p>
      </div>

      <footer className="w-full border-t border-t-foreground/10 flex justify-center text-center text-xs">
        <Footer />  
      </footer>
      
    </div>
  );
}
