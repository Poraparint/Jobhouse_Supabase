"use client"; // ใช้ client component

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import ShowWork from "../Components/ShowWork";
import EditProfileForm from "./Edit/EditProfileForm"; // เรียกใช้ component ใหม่
import Comment from "@/components/Comment";

export default function C_Pro_Edit() {
  const supabase = createClient();
  const useuserData = useUser(); // ไม่ destructure ทันที

  const [userData, setUserData] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false); // State สำหรับเปิดปิด modal
  const [showEdit, setShowEdit] = useState(false); // State สำหรับเปิดปิด modal

  const useuser = useuserData?.user;
  const isUserLoading = useuserData?.isLoading;
  const userError = useuserData?.error;

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
  const fetchUserData = async () => {
    try {
      const { data: userData, error } = await supabase
        .from("users")
        .select("username, avatar_url, userdetails")
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
        .from("cuswork")
        .select("*")
        .eq("user_id", useuser.id); // ดึงข้อมูลงานที่สัมพันธ์กับ user_id ของผู้ใช้

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
    <div className="Page w-[80%] mb-20">
      <div className="flex gap-5 text-secondary justify-between">
        <div className="relative p-9 gap-7 rounded-lg shadow-xl border border-third bg-gray-100 flex flex-col items-center w-[40%]">
          {/* ปุ่มเปิด modal */}
          <div
            onClick={() => setShowEdit(true)}
            className="p-2 rounded-lg border border-primary absolute top-4 right-4 flex gap-2 items-center bg-white text-primary hover:bg-primary hover:text-white cursor-pointer duration-200"
          >
            <i className="fa-solid fa-pen text-sm"></i>
            <p className="text-sm max-lg:hidden">แก้ไขโปรไฟล์</p>
            {/* ข้อความจะแสดงเมื่อ hover */}
          </div>
          {userData?.avatar_url ? (
            <div className="relative w-40 h-40 border rounded-full max-lg:w-20 max-lg:h-20 max-lg:mt-8 duration-300">
              <Image
                className="rounded-full"
                src={userData.avatar_url}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div>No Avatar</div>
          )}
          {userData?.username ? (
            <p className="font-medium text-2xl text-secondary">
              {userData.username}
            </p>
          ) : (
            <p>ไม่มีชื่อ</p>
          )}

          {/* ปุ่มเปิด modal */}
          <button
            className="py-3 px-6 shadow-lg rounded-lg bg-white text-primary border-primary border hover:bg-primary hover:text-white hover:border-white duration-300 "
            onClick={() => setShowModal(true)} // เปิด modal
          >
            เพิ่มงาน
          </button>
        </div>

        <div className="border border-third p-4 shadow-xl bg-gray-100 w-[70%] rounded-lg relative">
          {/* Modal แก้ไขโปรไฟล์ */}
          {userData?.userdetails ? (
            <div className="h-full">
              <textarea
                className="outline-none text-sm text-third h-full w-full bg-transparent"
                value={userData.userdetails}
              ></textarea>
            </div>
          ) : (
            <p>ไม่มีชื่อ</p>
          )}
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

      {/* เมื่อ showEdit เป็น true จะแสดงฟอร์ม */}
      {showEdit && (
        <div className="modal modal-open ">
          <div className="modal-box flex flex-col gap-5 p-5 max-w-[60rem]">
            {/* ส่งข้อมูลผู้ใช้ไปยัง EditProfileForm */}
            <div className="relative">
              <EditProfileForm user={userData} />
              <div className="modal-action absolute bottom-0 right-[120px] mb-3">
                <button
                  className="btn border-secondary text-secondary hover:bg-slate-100 duration-100 "
                  onClick={() => setShowEdit(false)} // ปิด modal เมื่อกดปุ่มยกเลิก
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal สำหรับเลือกประเภทงาน */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box flex flex-col gap-5 p-5">
            <h2 className="text-xl font-bold tracking-normal text-secondary mb-6">
              เลือกประเภทงาน
            </h2>
            <div className="flex justify-evenly ">
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
                onClick={() => setShowModal(false)} // ปิด modal
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
