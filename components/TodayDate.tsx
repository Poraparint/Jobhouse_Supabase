"use client"
import React from 'react'
import { useState, useEffect } from 'react';

export default function TodayDate() {

    const formatDate = (date) => {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return date.toLocaleDateString("th-TH", options); // ใช้ `th-TH` สำหรับการฟอร์แมตแบบไทย
    };

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
      const today = new Date();
      setCurrentDate(formatDate(today));
    }, []);


  return (
    <div className='text-primary text-[1.5rem] border border-primary shadow-xl py-2 px-4 rounded-lg'>
      Today : {currentDate}
    </div>
  )
}
