"use client"
import React from 'react'
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import Image from 'next/image';


export default function ShowWork({ work }: { work: any }) {

    
  return (
    <Link key={work.id} href={`/FWorkID/${work.id}`}>
      <div className="card bg-base-100 shadow-md w-full h-full hover:shadow-xl duration-150">
        <figure>
          {/* รูปภาพหลักของงาน */}
          <div className="relative w-full h-52">
            <Image
              src={work.work_mainimg} // URL ของรูปภาพงาน
              alt="Profile"
              layout="fill" // ใช้ layout fill เพื่อให้รูปภาพเต็มพื้นที่
              objectFit="cover" // ให้รูปภาพเต็มขนาดและครอบคลุม
            />
          </div>
        </figure>
        <div className="card-body p-4">
          {/* ชื่อของงาน */}
          <h1 className="card-title text-secondary text-base">
            {work.work_name}
          </h1>
          {/* หมวดหมู่ของงาน */}
          <p className="text-third text-xs">{work.work_catagory}</p>
          <div className="card-actions mt-5 flex justify-end">
            {/* งบประมาณของงาน */}
            <div className="text-baht text-base">{work.work_budget} ฿</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
