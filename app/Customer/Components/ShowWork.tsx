"use client"
import React from 'react'
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

export default function ShowWork({ work }: { work: any }) {

    
  return (
    <div className="card bg-base-100 shadow-xl w-full">
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
      <div className="card-body p-4 flex-col justify-between">
        {/* ชื่อของงาน */}
        <h1 className="card-title text-secondary text-lg font-normal">
          {work.work_name}
        </h1>
        <div className="card-actions mt-3 justify-between">
          <div className='text-third'>{work.work_catagory}</div>
          <div className='text-baht'>฿ {work.work_budget}</div>
        </div>
      </div>
    </div>
  );
}
