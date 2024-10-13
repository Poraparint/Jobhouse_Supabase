"use client"; // ใช้ client component

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import ShowWork from "./ShowWork";
import Footer from "./Footer";

export default function UserView({ username }) {
  const supabase = createClient();

  const [userData, setUserData] = useState<any>(null);
  const [userWorks, setUserWorks] = useState<any[]>([]); // สร้าง state สำหรับงานของผู้ใช้

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
  const fetchUserData = async () => {
    try {
      const decodedUsername = decodeURIComponent(username); // Decode the username
      const { data: userData, error } = await supabase
        .from("users")
        .select(
          "id, username, avatar_url, userdetails, bg_url, fb_url, ig_url, line_url"
        )
        .eq("username", decodedUsername) // Use the decoded username
        .single();

      if (error) throw error;
      setUserData(userData);
      // หลังจากดึงข้อมูลผู้ใช้แล้ว ให้ดึงงานของผู้ใช้คนนี้
      fetchUserWorks(userData.id); // เรียกใช้งานฟังก์ชันนี้เพื่อดึงงานของผู้ใช้ที่เลือก
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // ฟังก์ชันสำหรับดึงงานของผู้ใช้
  const fetchUserWorks = async (userId) => {
    try {
      // ใช้ userId ที่ได้จาก fetchUserData เพื่อดึงงานของผู้ใช้ที่เลือก
      const { data: works, error } = await supabase
        .from("FreelanceWork") // ชื่อ table ที่เก็บงานของผู้ใช้
        .select("*")
        .eq("user_id", userId); // ตรวจสอบว่า user_id ตรงกับ ID ของผู้ใช้ที่เลือก

      if (error) throw error;
      setUserWorks(works || []); // กำหนดค่าเป็น array ว่างถ้าไม่มีงาน
    } catch (error) {
      console.error("Error fetching user works:", error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData(); // ดึงข้อมูลผู้ใช้
    }
  }, [username]);

  if (!userData) return <div className="Page">Loading...</div>; // สถานะการโหลด

  return (
    <div className="w-full mt-14">
      <div className="relative flex flex-col-reverse">
        <div className="bg-bg max-lg:bg-inherit absolute z-10 p-5 text-secondary rounded-lg top-40 left-10 shadow-md max-lg:w-5/6 max-lg:top-5 max-lg:shadow-none w-80">
          <div className="max-lg:flex justify-between gap-5">
            <div className="relative py-6 px-9 gap-5 flex flex-col items-center w-full max-lg:bg-bg max-lg:rounded-md max-lg:shadow-md max-lg:px-2">
              <div className="relative w-28 h-28 rounded-full max-lg:w-14 max-lg:h-14">
                <Image
                  className="rounded-full"
                  src={userData.avatar_url || "/De_Profile.jpeg"}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="font-medium text-xl text-secondary max-lg:text-base flex text-center">
                {userData.username || "ไม่มีชื่อ"}
              </p>
            </div>
            <hr className="border-[0.5px] border-light my-7 max-lg:hidden" />
            <div className="flex flex-col gap-3 w-full max-lg:bg-bg max-lg:rounded-md max-lg:shadow-md max-lg:p-5">
              {userData?.fb_url && (
                <a
                  href={userData.fb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-primary w-full flex border justify-start gap-3 hover:text-white hover:bg-primary duration-200"
                >
                  <i className="fa-brands fa-facebook text-3xl"></i>
                  <div className="border-l-[0.5px] border-primary text-lg px-4 font-medium">
                    Facebook
                  </div>
                </a>
              )}
              {userData?.ig_url && (
                <a
                  href={userData.ig_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-pink-600 w-full flex border justify-start gap-3 hover:text-white hover:bg-pink-600 duration-200"
                >
                  <i className="fa-brands fa-instagram text-3xl px-0.5"></i>
                  <div className="border-l-[0.5px] border-pink-600 text-lg px-4 font-medium">
                    Instagram
                  </div>
                </a>
              )}
              {userData?.line_url && (
                <a
                  href={userData.line_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-baht w-full flex border justify-start gap-3 hover:text-white hover:bg-baht duration-200"
                >
                  <i className="fa-brands fa-line text-3xl"></i>
                  <div className="border-l-[0.5px] border-baht text-lg px-4 font-medium">
                    Line
                  </div>
                </a>
              )}
            </div>
            <hr className="border-[0.5px] border-light my-7 max-lg:hidden" />
          </div>

          <div className="p-3 bg-slate-50 w-full h-52 border border-light rounded-lg my-5 max-lg:hidden">
            <textarea
              className="outline-none text-sm text-third h-full w-full bg-transparent tracking-wider"
              value={userData.userdetails || "ข้อมูลผู้ใช้ไม่พร้อมใช้งาน"}
              readOnly
            ></textarea>
          </div>
        </div>

        {/* Background Image */}
        <div className="w-full h-[17rem] relative max-lg:h-[21rem]">
          <Image
            src={userData.bg_url || "/DefaultBG.jpeg"}
            alt="BG"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      {/* แสดงงานของผู้ใช้ */}
      <div className="flex justify-end px-10">
        <div className="w-[70%] max-lg:w-full ">
          <div>
            {userWorks.length > 0 ? ( // แสดงงานของผู้ใช้
              <div className="grid grid-cols-3 grid-rows-1 gap-5 max-lg:grid-cols-1 mt-8 bg-white shadow-md rounded-md p-5">
                {userWorks.map((work) => (
                  <ShowWork key={work.id} work={work} />
                ))}
              </div>
            ) : (
              <p>ผู้ใช้นี้ยังไม่มีงานที่เพิ่มในระบบ</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
