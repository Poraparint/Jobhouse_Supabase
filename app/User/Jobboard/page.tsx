"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import TodayDate from "@/components/TodayDate";

function jobboard() {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const fetch = async () => {
    const supabase = createClient();
    let { data: cuswork } = await supabase
      .from("cuswork")
      .select("work_name, work_budget, work_catagory, work_deadline, created_at");
    setData(cuswork);
  };

  useEffect(() => {
    fetch();
  }, []);

  const formatDate = (dateString: string) => {
    const options = { 
      day: "2-digit", 
      month: "2-digit", 
      year: "numeric" };
    return new Date(dateString).toLocaleDateString("th", options);
  };

  return (
    <div className="Page w-full flex flex-col items-center">
      <div className="w-[90%] border bg-white border-third shadow-2xl p-7 rounded-md tracking-wider">
      <div>รูปภาพ</div>
        <div className="flex justify-between w-full items-center">
          <h1 className="text-primary font-medium text-[2.5rem]">
            บอร์ดประกาศงาน
          </h1>
          <TodayDate />
        </div>
        <div className="flex flex-col items-end">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="my-4 border border-secondary w-[50%] p-3 text-xl rounded-lg outline-none bg-[#1A4870] text-slate-200 max-md:w-full"
            placeholder="Search. . ."
          />
        </div>
        <div className="border bg-slate-100 border-slate-800 rounded-md p-6">
        <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            className="my-5 border border-secondary w-[30%] p-3 text-xl rounded-lg outline-none text-primary max-md:w-full mr-6"
          >
            <option value="">All Categories</option>
            <option value="ออกแบบกราฟฟิก">ออกแบบกราฟฟิก</option>
            <option value="สถาปัตย์และวิศวกรรม">สถาปัตย์และวิศวกรรม</option>
            <option value="เว็บไซต์และเทคโนโลยี">เว็บไซต์และเทคโนโลยี</option>
            <option value="การตลาดและโฆษณา">การตลาดและโฆษณา</option>
            <option value="ภาพและรูปถ่าย">ภาพและรูปถ่าย</option>
            <option value="คอร์สการเรียนรู้">คอร์สการเรียนรู้</option>
            <option value="บทความ">บทความ</option>
            <option value="วางแพลนเที่ยว">วางแพลนเที่ยว</option>
          </select>
          <select
            name="deadline"
            onChange={(e) => setDeadline(e.target.value)}
            className="my-5 border border-secondary w-[30%] p-3 text-xl rounded-lg outline-none text-primary max-md:w-full"
          >
            <option value="">ไม่กำหนด</option>
            <option value="3-5 วัน">3-5 วัน</option>
            <option value="1 อาทิตย์">1 อาทิตย์</option>
            <option value="2 อาทิตย์">2 อาทิตย์</option>
            <option value="1 เดือน">1 เดือน</option>
            <option value="2 เดือน">2 เดือน</option>
          </select>
          <div className="flex justify-between items-center text-center text-white bg-green-600 py-6 rounded-tr-md rounded-tl-md">
            <div className="w-full">หัวข้อ</div>
            <div className="w-full">หมวดหมู่</div>
            <div className="w-full">ส่งมอบงานภายใน</div>
            <div className="w-full">งบประมาณ</div>
            <div className="w-full">วันที่สร้างโพส</div>
          </div>

          <div className="border border-black bg-white">
          {data && data.length > 0 ? (
            data.filter((note) => {
              const matchesSearch =
              search.toLowerCase() === "" ||
              note.work_name.toLowerCase().includes(search);
              const matchesCategory =
              category === "" || note.work_catagory === category ;
              const matchesDeadline =
              deadline === "" || note.work_deadline === deadline;
              return matchesSearch && matchesCategory && matchesDeadline;
            })
            .map((note, index: number) => (
              <div
              key={index}
              className="flex justify-between border text-center py-6 px-4"
              >
                  <div className="w-full">{note.work_name}</div>
                  <div className="w-full">{note.work_catagory}</div>
                  <div className="w-full">{note.work_deadline}</div>
                  <div className="w-full">{note.work_budget}</div>
                  <div className="w-full">{formatDate(note.created_at)}</div>
                </div>
              ))
            ) : (
              <div className="text-center p-3 text-lg w-full">
              ไม่มีการเพิ่มงานเข้ามา
            </div>
          )}
          </div>
          <div className="flex flex-row justify-center items-center"> 
          <button className="bg-primary text-white font-semibold hover:bg-blue-800 p-2 border border-black rounded-lg m-6 w-32">หน้าแรก</button>
          <button className="bg-primary text-white font-semibold hover:bg-blue-800 p-2 border border-black rounded-lg m-6 w-32">หน้าที่แล้ว</button>
          <p className="font-bold">1 / 8</p>
          <button className="bg-primary text-white font-semibold hover:bg-blue-800 p-2 border border-black rounded-lg m-6 w-32">หน้าถัดไป</button>
          <button className="bg-primary text-white font-semibold hover:bg-blue-800 p-2 border border-black rounded-lg m-6 w-32">หน้าสุดท้าย</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default jobboard;
