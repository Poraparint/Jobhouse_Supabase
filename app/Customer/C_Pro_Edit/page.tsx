import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Comment from "@/components/Comment";
import Link from "next/link";

export default async function Profile() {
  const supabase = createClient();

  const { data: { user },error, } = await supabase.auth.getUser();


  let { data: users } = await supabase
    .from("users")
    .select("username");
    

  if (error) {
    return <div>Error fetching user: {error.message}</div>;
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  return (
    <div className="Page w-[80%]">
      <div className="flex gap-5 text-secondary justify-between">
        <div className="p-5 gap-7 rounded-lg border border-secondary shadow-xl bg-gray-100 flex flex-col items-center w-[40%]">
          <Image
            src="/De_Profile.jpeg"
            alt="Profile"
            className="border border-white rounded-full hover:border-secondary duration-300"
            width={100}
            height={100}
          />
          <Link href="/Customer/CusAddwork">
            <button className="py-1 px-4 bg-primary shadow-xl rounded-md border border-secondary text-white hover:border-white duration-300">
              เพิ่มงาน
            </button>
          </Link>

          <p className="text-lg">{user.email}</p>
        </div>
        <div className="border flex flex-col gap-5 py-5 shadow-xl px-8 bg-gray-100 w-[70%] rounded-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">แก้ไขรูปโปรไฟล์</h1>
            <Image
              src="/De_Profile.jpeg"
              alt="Profile"
              className="border ml-2 border-white rounded-full hover:border-secondary duration-300"
              width={60}
              height={60}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">ชื่อที่แสดงในระบบ</h1>
            <form>
              <input
                type="text"
                name=""
                id=""
                className="text-primary ml-2 border border-secondary rounded-md p-2"
                value={user.email}
              />
            </form>
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
}
