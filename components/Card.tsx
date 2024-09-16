"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CardProps {
    search: string;
    category: string;
    deadline: string;
}

export default function Card({search, category, deadline }: CardProps) {

    const [data, setData] = useState<any>([]);

    const fetch = async () => {
      const supabase = createClient();

      let { data: Freework } = await supabase
        .from("FreelanceWork")
        .select(
          "work_name, work_mainimg, work_deadline, work_catagory, work_budget, created_at, users (username, avatar_url)"
        );
      setData(Freework);
    };

    useEffect(() => {
      fetch();
    }, []);
  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-6 max-lg:grid-cols-1">
      {data && data.length > 0 ? (
        data
          .filter((note) => {
            const matchesSearch =
              search.toString() === "" ||
                note.users.username.toString().includes(search);
                 const matchesDeadline =
                   deadline === "" || note.work_deadline === deadline;
            const matchesCategory =
              category === "" || note.work_catagory === category;
            return (
              matchesSearch &&
              matchesCategory &&
              matchesDeadline
            );
          })
          .map((note, index: number) => (
            <div key={index} className="card bg-base-100 shadow-xl w-full">
              <figure>
                <div className="relative w-full h-52">
                  <Image
                    src={note.work_mainimg}
                    alt="Profile"
                    className=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </figure>
              <div className="card-body p-4">
                <h1 className="card-title text-secondary">{note.work_name}</h1>
                <p className="text-third text-base">{note.work_catagory}</p>
                <div className="card-actions justify-between mt-5 items-center">
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full">
                      <Image
                        className="rounded-full"
                        src={note.users.avatar_url}
                        alt="Avatar"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="text-primary text-sm">
                      {note.users.username}
                    </div>
                  </div>
                  <div className="text-baht text-xl">{note.work_budget} ฿</div>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className="text-center p-3 text-lg w-full">
          ไม่มีการเพิ่มงานเข้ามา
        </div>
      )}
    </div>
  );
}

