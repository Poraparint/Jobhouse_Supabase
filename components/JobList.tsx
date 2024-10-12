"use client";

import Link from "next/link";

interface JobListProps {
  data: any[]; // ข้อมูลที่ดึงมาจากฐานข้อมูล
  category: string; // หมวดหมู่ที่ใช้กรองข้อมูล
  userId: string; // เพิ่ม userId
  showMyJobs: boolean; // เปลี่ยน showMyJobs เป็น boolean
  formatDate: (dateString: string) => string; // ฟังก์ชันสำหรับ format วันที่
}

// Component JobList จะรับ props สำหรับแสดงและกรองรายการงาน
export default function JobList({
  data,
  category,
  userId,
  showMyJobs,
  formatDate,
}: JobListProps) {
  return (
    <div className="border-x-[0.5px] border-light bg-white text-secondary">
      {data && data.length > 0 ? ( // ตรวจสอบว่ามีข้อมูลใน array หรือไม่
        data
          // กรองข้อมูลตามหมวดหมู่
          .filter((note) => {
            // กรองโดยหมวดหมู่ (category)
            const matchesCategory =
              category === "" || // ถ้าไม่มีหมวดหมู่ก็แสดงทั้งหมด
              note.work_catagory === category; // ตรวจสอบว่ามีการกรองตามหมวดหมู่หรือไม่

            // ตรวจสอบว่าควรแสดงงานของผู้ใช้หรือไม่
            const matchesMyJobs = !showMyJobs || note.user_id === userId; // ถ้า showMyJobs เป็น false ก็ให้แสดงงานทั้งหมด

            // ส่งค่าที่ตรงตามเงื่อนไขการกรองทั้งหมด
            return matchesCategory && matchesMyJobs;
          })
          .map((note, index) => (
            <Link key={note.id} href={`/CWorkID/${note.id}`}>
              <div
                className={`flex justify-between items-center text-center text-secondary border-b border-light p-6 transition-all duration-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-slate-100`}
              >
                <div className="w-[36%] self-start flex">{note.work_name}</div>
                <div className="w-[16%]">{note.work_catagory}</div>
                <div className="w-[16%]">{formatDate(note.work_deadline)}</div>
                <div className="w-[16%]">{note.work_budget}</div>
                <div className="w-[16%]">{formatDate(note.created_at)}</div>
              </div>
            </Link>
          ))
      ) : (
        <div className="p-5 text-center">ไม่พบข้อมูล</div> // ข้อความแสดงเมื่อไม่มีข้อมูล
      )}
    </div>
  );
}
