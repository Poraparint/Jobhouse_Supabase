"use client";

// นำเข้า createClient จาก utils/supabase/client สำหรับเชื่อมต่อ Supabase
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react"; // ใช้ useState และ useEffect จาก React สำหรับจัดการ state และ lifecycle
import Image from "next/image"; // ใช้ next/image สำหรับการแสดงรูปภาพที่มีประสิทธิภาพ

// กำหนด prop types สำหรับ component Card
interface CardProps {
  search: string; // ข้อความค้นหาที่ใช้ในการกรองข้อมูล
  category: string; // หมวดหมู่ที่เลือกใช้ในการกรองข้อมูล
  deadline: string; // เวลาที่เลือกใช้ในการกรองข้อมูล
}

// Component Card สำหรับแสดงงานฟรีแลนซ์ในรูปแบบ card
export default function Card({ search, category, deadline }: CardProps) {
  // สร้าง state สำหรับเก็บข้อมูลงานที่ดึงมาจาก Supabase
  const [data, setData] = useState<any>([]);

  // ฟังก์ชันสำหรับดึงข้อมูลจากฐานข้อมูล Supabase
  const fetch = async () => {
    const supabase = createClient(); // สร้าง client ของ Supabase

    // Query ข้อมูลจากตาราง FreelanceWork และเชื่อมโยงกับ users (ข้อมูลผู้ใช้)
    let { data: Freework } = await supabase
      .from("FreelanceWork")
      .select(
        "work_name, work_mainimg, work_deadline, work_catagory, work_budget, created_at, users (username, avatar_url)"
      )
      .order("created_at", { ascending: false }); // เพิ่มการเรียงลำดับตามเวลาที่สร้างโพสต์ใหม่สุด;;

    // เก็บข้อมูลที่ได้ใน state
    setData(Freework);
  };

  // ใช้ useEffect เพื่อดึงข้อมูลจาก Supabase เมื่อ component ถูก mount
  useEffect(() => {
    fetch(); // เรียกฟังก์ชัน fetch เพื่อดึงข้อมูล
  }, []); // dependency array ว่างหมายถึงการรันเพียงครั้งเดียวเมื่อ component mount

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-6 max-lg:grid-cols-1">
      {/* ตรวจสอบว่ามีข้อมูลใน array หรือไม่ */}
      {data && data.length > 0 ? (
        // กรองข้อมูลตามการค้นหา หมวดหมู่ และกำหนดเวลา
        data
          .filter((note) => {
            const matchesSearch =
              search.toLowerCase() === "" || // ถ้าไม่มีข้อความค้นหาแสดงทั้งหมด
              (note.users &&
                note.users.username &&
                note.users.username
                  .toLowerCase()
                  .includes(search.toLowerCase())); // ตรวจสอบว่ามี users และ username ก่อนที่จะค้นหา

            const matchesDeadline =
              deadline === "" || note.work_deadline === deadline; // กรองตามเวลาส่งงานที่เลือก

            const matchesCategory =
              category === "" || note.work_catagory === category; // กรองตามหมวดหมู่ที่เลือก

            // แสดงเฉพาะข้อมูลที่ตรงกับทั้ง search, category และ deadline
            return matchesSearch && matchesCategory && matchesDeadline;
          })
          // แสดงข้อมูลแต่ละชิ้นในรูปแบบ card
          .map((note, index: number) => (
            <div key={index} className="card bg-base-100 shadow-xl w-full">
              <figure>
                {/* รูปภาพหลักของงาน */}
                <div className="relative w-full h-52">
                  <Image
                    src={note.work_mainimg} // URL ของรูปภาพงาน
                    alt="Profile"
                    layout="fill" // ใช้ layout fill เพื่อให้รูปภาพเต็มพื้นที่
                    objectFit="cover" // ให้รูปภาพเต็มขนาดและครอบคลุม
                  />
                </div>
              </figure>
              <div className="card-body p-4">
                {/* ชื่อของงาน */}
                <h1 className="card-title text-secondary text-lg font-normal">
                  {note.work_name}
                </h1>
                {/* หมวดหมู่ของงาน */}
                <p className="text-third text-sm font-normal">
                  {note.work_catagory}
                </p>
                <div className="card-actions justify-between mt-5 items-center">
                  <div className="flex items-center gap-2">
                    {/* รูปโปรไฟล์ของผู้ใช้ */}
                    <div className="relative w-7 h-7 rounded-full">
                      <Image
                        className="rounded-full"
                        src={note.users.avatar_url || "/De_Profile.jpeg"} // รูปโปรไฟล์ของผู้ใช้ หรือใช้รูปเริ่มต้นถ้าไม่มี
                        alt="Avatar"
                        layout="fill" // ใช้ layout fill เพื่อให้รูปโปรไฟล์เต็มพื้นที่
                        objectFit="cover" // ให้รูปโปรไฟล์เต็มขนาดและครอบคลุม
                      />
                    </div>
                    {/* ชื่อผู้ใช้ */}
                    <div className="text-primary text-sm">
                      {note.users.username}
                    </div>
                  </div>
                  {/* งบประมาณของงาน */}
                  <div className="text-baht text-xl font-normal">
                    {note.work_budget} ฿
                  </div>
                </div>
              </div>
            </div>
          ))
      ) : (
        // ถ้าไม่มีข้อมูล (เช่น ข้อมูลไม่ตรงกับการกรอง) จะแสดงข้อความนี้
        <div className="text-center p-3 text-lg w-full">
          ไม่มีการเพิ่มงานเข้ามา
        </div>
      )}
    </div>
  );
}
