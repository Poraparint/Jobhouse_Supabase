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
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("th", options);
  };

  return (
    <div className="Page w-full flex flex-col items-center">
      <div className="w-[90%] border bg-white border-third shadow-2xl p-7 rounded-md tracking-wider">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-primary font-medium text-[2.5rem]">
            บอร์ดประกาศงาน
          </h1>
          <TodayDate />
        </div>
        <hr className="border-primary border rounded-md my-3" />
        <div className="flex flex-col">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="my-5 border border-secondary w-[50%] p-3 text-xl rounded-lg outline-none text-primary max-md:w-full"
            placeholder="Search. . ."
          />
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            className="my-5 border border-secondary w-[50%] p-3 text-xl rounded-lg outline-none text-primary max-md:w-full"
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
        </div>
        <hr className="border-third rounded-full my-10" />

        <div className="border text-secondary ">
          <div className="flex justify-between border text-center">
            <div className="border w-full">ชื่องาน</div>
            <div className="border w-full">หมวดหมู่</div>
            <div className="border w-full">ราคา</div>
            <div className="border w-full">กำหนดส่งงาน</div>
          </div>
          {data && data.length > 0 ? (
            data
              .filter((note) => {
                const matchesSearch =
                  search.toLowerCase() === "" ||
                  note.work_name.toLowerCase().includes(search);
                const matchesCategory =
                  category === "" || note.work_catagory === category;
                return matchesSearch && matchesCategory;
              })
              .map((note, index: number) => (
                <div
                  key={index}
                  className="flex justify-between border text-center"
                >
                  <div className="border w-full">{note.work_name}</div>
                  <div className="border w-full">{note.work_catagory}</div>
                  <div className="border w-full">{note.work_budget}</div>
                  <div className="border w-full">{note.work_deadline}</div>
                </div>
              ))
          ) : (
            <div className="text-center p-3 text-lg w-full">
              ไม่มีการเพิ่มงานเข้ามา
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default jobboard;
