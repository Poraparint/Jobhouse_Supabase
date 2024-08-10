"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

function jobboard() {
  const [data, setData] = useState<any>([]);

  const fetch = async () => {
    const supabase = createClient();
    let { data: Cus_Work } = await supabase
      .from("Cus_Work")
      .select("work_name, work_budget, work_catagory, work_deadline, created_at");
    setData(Cus_Work);
  };

  useEffect(() => {
    fetch();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("th");
  };

  return (
    <div className="Page w-full flex flex-col items-center">
      <div className="w-[90%]">
        <h1 className="text-primary font-semibold text-[3rem]">
          บอร์ดประกาศงาน
        </h1>
        <div className="mt-10 text-secondary flex gap-5">
          {data.map((index, note) => (
            <div key={note} className="border border-secondary rounded-md p-4 shadow-xl flex flex-col gap-3 bg-white">
              <h1 className="text-primary text-xl">{index.work_name}</h1>
              <hr className="border-third border"/>
              <p className="ml-3">หมวดหมู่ : {index.work_catagory}</p>
              <p className="ml-3">งบประมาณ : {index.work_budget} ฿</p>
              <p className="ml-3">ลงประกาศเมื่อ : { formatDate(index.created_at) }</p>
              <p className="ml-3">กำหนดส่งงาน : { formatDate(index.work_deadline) }</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default jobboard;
