import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Comment from "@/components/Comment";
import Link from "next/link";
import ShowWork from "../Components/ShowWork";


export default async function Profile() {
  const supabase = createClient();

  const { data: { user },error, } = await supabase.auth.getUser();
    
  if (error) {
    return <div>Error fetching user: {error.message}</div>;
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  const { data: works, error: workError } = await supabase
    .from("cuswork")
    .select("*")
    .eq("user_id", user.id);

  if (workError) {
    return <div>Error fetching works: {workError.message}</div>;
  }

  return (
    <div className="Page w-[80%] mb-20">
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
          <Link href="/">
            <button className="py-1 px-4 bg-primary shadow-xl rounded-md border border-secondary text-white hover:border-white duration-300">
              Freelancer
            </button>
          </Link>

          <p className="text-lg">{user.email}</p>
        </div>
        <div className="border flex flex-col gap-5 py-5 shadow-xl px-8 bg-gray-100 w-[70%] rounded-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">แก้ไขรูปโปรไฟล์</h1>
            <div className="flex gap-4">
              <Image
                src="/De_Profile.jpeg"
                alt="Profile"
                className="border ml-2 border-white rounded-full hover:border-secondary duration-300"
                width={60}
                height={60}
              />
              <Image
                src="/Edit.svg"
                alt="Edit"
                className=""
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">ชื่อที่แสดงในระบบ</h1>
            <form className="flex gap-4">
              <input
                type="text"
                name=""
                id=""
                className="text-primary border border-secondary rounded-md p-2"
                value={user.email}
              />
              <Image
                src="/Edit.svg"
                alt="Edit"
                className=""
                width={20}
                height={20}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="flex gap-7 mt-5 max-lg:flex-col">
        <div className="w-[70%] max-lg:w-full mt-5">
          <div className="text-primary text-2xl font-medium flex flex-col gap-5">
            <h1 className="ml-5">งานของคุณ</h1>
            <hr className="border-2 border-primary rounded-full" />
          </div>
          {works && works.length > 0 ? (
            <div className="flex flex-col gap-4 mt-5">
              {works.map((work) => (
                <ShowWork key={work.id} work={work} />
              ))}
            </div>
          ) : (
            <p>คุณยังไม่มีงานที่เพิ่มในระบบ</p>
          )}
        </div>

        <Comment />
      </div>
    </div>
  );
}
