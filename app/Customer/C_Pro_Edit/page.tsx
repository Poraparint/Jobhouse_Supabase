import { createClient } from "@/utils/supabase/server";

export default async function Profile() {
  const supabase = createClient();

  const { data: { user },error, } = await supabase.auth.getUser();

  if (error) {
    return <div>Error fetching user: {error.message}</div>;
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  return (
    <div className="Page">
        <div>
            <img src="" alt="" />
        </div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-lg">Email: {user.email}</p>
    </div>
  );
}
