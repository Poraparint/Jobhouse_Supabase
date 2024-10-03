"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'

export default function Comment() {
  const [data, setData] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    const supabase = createClient();
    try {
      const { data: notes, error } = await supabase
        .from("notes")
        .select("name, title, users (username, avatar_url)");
      if (error) throw error;
      setData(notes);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes(); // เรียกฟังก์ชัน fetch เพื่อดึงข้อมูล
  }, []); // dependency array ว่างหมายถึงการรันเพียงครั้งเดียวเมื่อ component mount

  return (
    <div className="mt-5 text-secondary flex flex-col gap-5 w-[50%] max-lg:w-full">
      <h1 className="ml-5 text-primary text-2xl font-medium">
        รีวิวจากฟรีแลนซ์
      </h1>
      <hr className="border-2 border-primary rounded-full" />
      {loading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        data.map((note, index) => (
          <div
            className="border border-secondary bg-white p-3 rounded-lg shadow-xl"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <div className="relative w-9 h-9 rounded-full duration-300">
                <Image
                  className="rounded-full"
                  src={note?.users?.avatar_url || "/De_Profile.jpeg"}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h1>{note?.users?.username || "ไม่ระบุชื่อ"}</h1>
            </div>
            <hr className="border-[#D9D9D9] my-2" />
            <p className="m-2">{note.title}</p>
          </div>
        ))
      ) : (
        <p>ไม่มีรีวิวในตอนนี้</p>
      )}
    </div>
  );
}