"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import TodayDate from "@/components/TodayDate";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function jobboard() {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<any>("");

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

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("th");
  };

  return (
    <div className="Page w-full flex flex-col items-center">
      <div className="w-[90%] border bg-white border-third shadow-2xl rounded-md p-7 tracking-wider">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-primary font-medium text-[2.5rem]">
            บอร์ดประกาศงาน
          </h1>
          <TodayDate />
        </div>
        <hr className="border-primary border rounded-md my-3" />
        <input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="my-5 border border-secondary w-[50%] p-3 text-xl rounded-lg outline-none text-primary max-md:w-full"
          placeholder="Search. . ."
        />
        <div className="mt-10 text-secondary grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {data && data.length > 0 ? (
            data
              .filter((note) => {
                return search.toLowerCase() === ""
                  ? note
                  : note.work_name.toLowerCase().includes(search);
              })
              .map((note, index) => (
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
            <div className="text-center p-3 text-lg">No Names Added</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default jobboard;
