"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import TodayDate from "@/components/TodayDate";
import Search from "@/components/Search";
import JobList from "./JobList";

function jobboard() {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  // Pagination
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState<any>("");
  const itemPerPage = 9;

  const fetch = async () => {
    const supabase = createClient();

    // สร้าง query
    let query = supabase
      .from("cuswork")
      .select(
        "work_name, work_budget, work_catagory, work_deadline, created_at, users (username)",
        { count: "exact" }
      )
      .order("created_at", { ascending: false }); // เพิ่มการเรียงลำดับตามเวลาที่สร้างโพสต์ใหม่สุด;

    // กรองข้อมูลตามการค้นหา
    if (search) {
      query = query.ilike("users.username", `%${search}%`);
    }

    // กรองข้อมูลตามหมวดหมู่
    if (category) {
      query = query.eq("work_catagory", category);
    }

    // กรองข้อมูลตาม deadline
    if (deadline) {
      query = query.eq("work_deadline", deadline);
    }

    // Pagination
    let {
      data: cuswork,
      error,
      count,
    } = await query.range((page - 1) * itemPerPage, page * itemPerPage - 1);

    if (!cuswork || error) {
      console.log("error", error);
      return;
    }

    setData(cuswork);

    // คำนวณจำนวนหน้าสูงสุดจากผลลัพธ์ใหม่
    count = count || 1;
    const calculateMaxPage = Math.ceil(count / itemPerPage);
    setMaxPage(calculateMaxPage);

    // ตรวจสอบว่าหน้าปัจจุบันเกินจำนวนหน้าสูงสุดหรือไม่
    if (page > calculateMaxPage) {
      setPage(calculateMaxPage);
    }
  };

  // ดึงข้อมูลเมื่อ page, search, category, หรือ deadline เปลี่ยนแปลง
  useEffect(() => {
    fetch();
  }, [page, search, category, deadline]);

  const formatDate = (dateString: string) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("th", options);
  };

  return (
    <div className="Page w-full flex flex-col items-center">
      <div className="w-[90%] border bg-white border-light shadow-2xl p-7 rounded-md tracking-wider">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-primary font-medium text-[2.5rem]">
            บอร์ดประกาศงาน
          </h1>
          <TodayDate />
        </div>

        <div className="flex justify-between max-lg:flex-col">
          {/* ใช้ Search Component */}
          <Search
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            deadline={deadline}
            setDeadline={setDeadline}
          />
          <div className="flex flex-col max-lg:items-center items-end my-3 gap-3 justify-end max-lg:w-full w-[20%]">
            <span className="text-secondary flex self-center">
              Page {page} / {maxPage}
            </span>
            <div className="flex gap-2">
              <button
                className={`btn btn-primary text-white text-lg font-normal px-4 ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                type="button"
                disabled={page === 1}
              >
                ย้อนกลับ
              </button>

              <button
                className={`btn btn-primary text-white text-lg font-normal px-5 ${
                  page === maxPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (page < maxPage) {
                    setPage(page + 1);
                  }
                }}
                type="button"
                disabled={page === maxPage}
              >
                ไปต่อ
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-center text-white bg-primary p-6 rounded-tr-md rounded-tl-md">
          <div className="w-[36%]">หัวข้อ</div>
          <div className="w-[16%]">หมวดหมู่</div>
          <div className="w-[16%]">ส่งมอบงานภายใน</div>
          <div className="w-[16%]">งบประมาณ</div>
          <div className="w-[16%]">วันที่สร้างโพส</div>
        </div>

        {/* ใช้ JobList Component */}
        <JobList
          data={data}
          search={search}
          category={category}
          deadline={deadline}
          formatDate={formatDate}
        />
      </div>
      <Footer />
    </div>
  );
}

export default jobboard;
