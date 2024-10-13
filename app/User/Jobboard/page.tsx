"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import TodayDate from "@/components/TodayDate";
import JobList from "../../../components/JobList";

function Jobboard() {
  const [data, setData] = useState<any>([]);
  const [category, setCategory] = useState<string>(""); // ใช้เฉพาะ category สำหรับการกรอง
  const [userId, setUserId] = useState<string>(""); // State for user ID
  const [showMyJobs, setShowMyJobs] = useState<boolean>(false); // เปลี่ยน state เป็น boolean

  // Pagination
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState<any>("");
  const itemPerPage = 9;

  const fetch = async () => {
    const supabase = createClient();

    // Fetch the user ID
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id); // Set the user ID from the logged-in user
    } else if (userError) {
      console.error("Error fetching user:", userError);
    }

    // สร้าง query
    let query = supabase
      .from("cuswork")
      .select("*, users (username)", { count: "exact" })
      .order("created_at", { ascending: false });

    // กรองข้อมูลตามหมวดหมู่
    if (category) {
      query = query.eq("work_catagory", category);
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

  // ดึงข้อมูลเมื่อ page, category หรือ showMyJobs เปลี่ยนแปลง
  useEffect(() => {
    fetch();
  }, [page, category, userId]); // ลบ search, deadline ออกจาก dependencies

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  return (
    <div className="Page w-full flex flex-col items-center">
      <div className="w-[90%] border bg-bg border-light shadow-2xl p-7 rounded-md tracking-wider">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-primary font-medium text-[2.5rem]">
            บอร์ดประกาศงาน
          </h1>
          <TodayDate />
        </div>

        <div className="flex justify-between max-lg:flex-col items-center">
          <div className="w-full flex gap-5">
            {/* ใช้ Select สำหรับกรองงานของตัวเอง */}
            <select
              value={showMyJobs ? "myJobs" : "all"} // ใช้ value เป็น string เพื่อให้ตรงกับ option
              onChange={(e) => setShowMyJobs(e.target.value === "myJobs")} // อัปเดต state เมื่อมีการเปลี่ยนแปลง
              className="cursor-pointer my-5 border border-primary p-2 text-xl rounded-lg outline-none text-primary"
            >
              <option value="all">งานทั้งหมด</option>
              <option value="myJobs">งานของฉัน</option>
            </select>

            {/* Dropdown สำหรับเลือกหมวดหมู่ */}
            <select
              name="category"
              value={category} // ค่าที่ถูกเลือกใน dropdown
              onChange={(e) => setCategory(e.target.value)} // เปลี่ยนหมวดหมู่เมื่อมีการเลือกใหม่
              className="cursor-pointer my-5 border border-primary p-2 text-xl rounded-lg outline-none text-primary"
            >
              <option value="">หมวดหมู่</option>
              <option value="ไม่มีกำหนด">ไม่มีกําหนด</option>
              <option value="ออกแบบกราฟฟิก">ออกแบบกราฟฟิก</option>
              <option value="สถาปัตย์และวิศวกรรม">สถาปัตย์และวิศวกรรม</option>
              <option value="เว็บไซต์และเทคโนโลยี">เว็บไซต์และเทคโนโลยี</option>
              <option value="การตลาดและโฆษณา">การตลาดและโฆษณา</option>
              <option value="งานศิลปะ">งานศิลปะ</option>
              <option value="ภาพและรูปถ่าย">ภาพและรูปถ่าย</option>
              <option value="คอร์สการเรียนรู้">คอร์สการเรียนรู้</option>
              <option value="บทความ">บทความ</option>
              <option value="การเดินทางและท่องเที่ยว">
                การเดินทางและท่องเที่ยว
              </option>
              <option value="สุขภาพ">สุขภาพ</option>
              <option value="ดนตรี">ดนตรี</option>
              <option value="อาหารและเครื่องดื่ม">อาหารและเครื่องดื่ม</option>
              <option value="ธรรมชาติ">ธรรมชาติ</option>
            </select>
          </div>
          <div className="flex flex-col max-lg:items-center my-3 gap-3 max-lg:w-full">
            <span className="text-secondary flex self-center">
              Page {page} / {maxPage}
            </span>
            <div className="flex gap-2 justify-center">
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
          category={category}
          userId={userId} // ส่ง userId ไปยัง JobList
          showMyJobs={showMyJobs} // ส่ง showMyJobs ไปยัง JobList
          formatDate={formatDate}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Jobboard;
