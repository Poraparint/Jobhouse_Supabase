"use client"; // ใช้ client component

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import ShowWork from "../Components/ShowWork";
import Footer from "@/components/Footer";
import Comment from "@/components/Comment";
import EditProfileForm from "./Edit/EditProfileForm"; // เรียกใช้ component ใหม่

export default function C_Pro_Edit() {
  const supabase = createClient();
  const useuserData = useUser(); // ไม่ destructure ทันที

  const [userData, setUserData] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false); // State สำหรับเปิดปิด modal
  const [showEdit, setShowEdit] = useState(false); // State สำหรับเปิดปิด modal

  const [showWorks, setShowWorks] = useState(true); // เพิ่ม state สำหรับจัดการการแสดง ShowWork
  const [showReviews, setShowReviews] = useState(false); // State สำหรับการแสดงผลรีวิว

  const useuser = useuserData?.user;
  const isUserLoading = useuserData?.isLoading;
  const userError = useuserData?.error;

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
  const fetchUserData = async () => {
    try {
      const { data: userData, error } = await supabase
        .from("users")
        .select("username, avatar_url, userdetails, bg_url")
        .eq("id", useuser.id)
        .limit(1)
        .single(); // ดึงข้อมูลผู้ใช้หนึ่งคน

      if (error) throw error;
      if (userData) {
        setUserData(userData); // บันทึกข้อมูลผู้ใช้
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // ฟังก์ชันสำหรับดึงข้อมูลงาน
  const fetchWorks = async () => {
    try {
      const { data: works, error } = await supabase
        .from("FreelanceWork")
        .select("work_name, work_mainimg, work_catagory, work_budget")
        .eq("user_id", useuser.id) // ดึงข้อมูลงานที่สัมพันธ์กับ user_id ของผู้ใช้
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWorks(works || []); // บันทึกข้อมูลงาน
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  useEffect(() => {
    if (useuser && !isUserLoading) {
      fetchUserData();
      fetchWorks();
    }
  }, [useuser, isUserLoading]);

  // แสดงสถานะการโหลดหากข้อมูลยังไม่พร้อม
  if (isUserLoading || !useuser) {
    return <div>Loading...</div>;
  }

  // ถ้ามี error ในการดึงข้อมูล user
  if (userError) {
    return <div>Error fetching user: {userError.message}</div>;
  }

  if (!useuser) {
    return <div>User not logged in</div>;
  }

  console.log(userData);

  return (
    <div className="w-full mt-14">
      <div className="relative">
        <div className="bg-white absolute z-10 py-2 px-3 flex flex-col gap-5 text-secondary rounded-lg top-40 left-16 shadow-2xl">
          <div className="relative py-6 px-16 gap-8 flex flex-col items-center w-full max-lg:px-12">
            <div
              onClick={() => setShowEdit(true)}
              className="p-2 rounded-lg border border-primary absolute top-4 right-4 flex gap-2 items-center bg-white text-primary hover:bg-primary hover:text-white cursor-pointer duration-200"
            >
              <i className="fa-solid fa-pen text-sm"></i>
              <p className="text-sm max-lg:hidden">แก้ไขโปรไฟล์</p>
            </div>
            {userData?.avatar_url ? (
              <div className="relative w-28 h-28 rounded-full max-lg:w-20 max-lg:h-20 max-lg:mt-8 duration-300 mt-12">
                <Image
                  className="rounded-full"
                  src={userData.avatar_url}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <div className="relative w-28 h-28 rounded-full max-lg:w-20 max-lg:h-20 max-lg:mt-8 duration-300 mt-12">
                <Image
                  className="rounded-full"
                  src="/De_Profile.jpeg"
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            {userData?.username ? (
              <p className="font-medium text-2xl text-secondary max-lg:text-xl">
                {userData.username}
              </p>
            ) : (
              <p>ไม่มีชื่อ</p>
            )}
            <button
              className="py-2 px-6 shadow-lg rounded-lg bg-white text-primary border-primary border hover:bg-primary hover:text-white hover:border-white duration-300"
              onClick={() => setShowModal(true)}
            >
              เพิ่มงาน
            </button>
          </div>
          <hr className="border-primary rounded-full border-[0.5px]" />
          <div className="p-3 bg-slate-50 w-full border border-light rounded-lg h-52 mb-5">
            {userData?.userdetails ? (
              <div className="h-full">
                <textarea
                  className="outline-none text-sm text-third h-full w-full bg-transparent tracking-wider"
                  value={userData.userdetails}
                ></textarea>
              </div>
            ) : (
              <p>สามารถใส่ข้อมูลผู้ใช้ได้</p>
            )}
          </div>
        </div>
        {userData?.bg_url ? (
          <div className="w-full h-[17rem] relative">
            <Image
              className=""
              src={ userData.bg_url }
              alt="BG"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="w-full h-[17rem] relative">
            <Image
              className=""
              src="/DefaultBG.jpeg"
              alt="BG"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <div className="w-full flex">
          <div className="w-full flex justify-end bg-gray-100 drop-shadow-md">
            <div className="flex justify-evenly text-secondary text-lg py-3 max-lg:w-[60%] w-[80%]">
              <h1>รายละเอียด</h1>

              <h1
                className={`cursor-pointer ${
                  showWorks ? "text-primary" : "text-secondary"
                }`}
                onClick={() => {
                  setShowWorks(true);
                  setShowReviews(false); // ซ่อนรีวิวเมื่อแสดงผลงาน
                }}
              >
                ผลงาน
              </h1>
              <h1
                className={`cursor-pointer ${
                  showReviews ? "text-primary" : "text-secondary"
                }`}
                onClick={() => {
                  setShowWorks(false);
                  setShowReviews(true); // เมื่อกดปุ่มจะแสดงรีวิว
                }}
              >
                รีวิว
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-end px-10">
          <div className="w-[70%] max-lg:w-[50%]">
            {showWorks && (
              <div>
                {works && works.length > 0 ? (
                  <div className="grid grid-cols-3 grid-rows-1 gap-4 max-lg:grid-cols-1 mt-8">
                    {works.map((work) => (
                      <ShowWork key={work.id} work={work} />
                    ))}
                  </div>
                ) : (
                  <p>คุณยังไม่มีงานที่เพิ่มในระบบ</p>
                )}
              </div>
            )}
            {showReviews && (
              <div className="mt-8">
                {/* เรียกใช้ Comment component */}
                <Comment />
              </div>
            )}
          </div>
        </div>

        <div className="mb-20">
          {showEdit && (
            <div className="modal modal-open">
              <div className="modal-box flex flex-col gap-5 p-5 max-w-[60rem] shadow-lg rounded-lg">
                <div className="relative">
                  <EditProfileForm user={userData} />
                  <div className="modal-action absolute bottom-0 right-[120px] mb-3 mr-6">
                    <button
                      className="btn border-secondary text-secondary hover:bg-slate-100 duration-100 "
                      onClick={() => setShowEdit(false)}
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModal && (
            <div className="modal modal-open">
              <div className="modal-box flex flex-col gap-5 p-5 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold tracking-normal text-secondary mb-6">
                  เลือกประเภทงาน
                </h2>
                <div className="flex justify-evenly">
                  <Link href="/Customer/CusAddwork">
                    <button className="btn btn-primary w-full font-normal text-white tracking-wide">
                      ประกาศหาฟรีแลนซ์
                    </button>
                  </Link>
                  <Link href="/Customer/FreeAddwork">
                    <button className="btn btn-primary w-full font-normal text-white tracking-wide px-7">
                      เพิ่มงานของคุณ
                    </button>
                  </Link>
                </div>
                <div className="modal-action">
                  <button
                    className="btn border-secondary text-secondary hover:bg-slate-100 duration-100"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
