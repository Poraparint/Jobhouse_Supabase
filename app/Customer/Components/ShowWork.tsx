"use client"
import React from 'react'
import { createClient } from '@/utils/supabase/client';

export default function ShowWork({ work }: { work: any }) {

    
  return (
    <div className="text-secondary tracking-wide border border-secondary rounded-md p-5 shadow-xl flex flex-col gap-5 bg-white">
      <h1 className="text-primary font-semibold text-lg">{work.work_name}</h1>
      <hr className="border-primary rounded-lg" />
      <p> - {work.work_detail}</p>
      <div className="flex justify-between mt-4">
        <p>กำหนดส่ง: {work.work_deadline}</p>
        <div className="flex gap-1">
          <p>งบประมาณ :</p>
          <p className="text-baht">{work.work_budget} ฿</p>
        </div>
      </div>
      
    </div>
  );
}
