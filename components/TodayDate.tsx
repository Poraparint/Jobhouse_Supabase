"use client";
import React, { useState, useEffect } from "react";

export default function TodayDate() {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("th-TH", options); // ใช้ `th-TH` สำหรับการฟอร์แมตแบบไทย
  };

  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(formatDate(today));
  }, []);

  return (
    <div className="text-primary text-[1.5rem] py-2 px-4">
      Today : {currentDate}
    </div>
  );
}
