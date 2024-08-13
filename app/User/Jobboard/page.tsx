"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import TodayDate from "@/components/TodayDate";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
        <hr className="border-third rounded-full my-10"/>
        
        <div className="text-secondary grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
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
              .map((note, index : number) => (
                <div
                  key={index}
                  className="border border-third rounded-md p-5 shadow-xl flex flex-col gap-5 bg-white"
                >
                  <div className="flex gap-3">
                    <Image
                      src="/Case.svg"
                      alt="Briefcase"
                      className=""
                      width={20}
                      height={20}
                    />
                    <h1 className="text-primary text-xl">{note.work_name}</h1>
                  </div>
                  <hr className="border-third rounded-full" />
                  <div className="ml-1 mt-5 flex gap-1">
                    <p className="text-primary">หมวดหมู่ :</p>
                    <p>{note.work_catagory}</p>
                  </div>
                  <div className="ml-1 mt-5 flex gap-1">
                    <p className="text-primary">งบประมาณ :</p>
                    <p>{note.work_budget} ฿</p>
                  </div>
                  <div className="ml-1 mt-5 flex gap-1">
                    <p className="text-primary">ลงประกาศเมื่อ :</p>
                    <p>{formatDate(note.created_at)}</p>
                  </div>
                  <div className="ml-1 mt-5 flex gap-1">
                    <p className="text-primary">กำหนดส่งงาน :</p>
                    <p>{note.work_deadline}</p>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center p-3 text-lg w-full">ไม่มีการเพิ่มงานเข้ามา</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default jobboard;
