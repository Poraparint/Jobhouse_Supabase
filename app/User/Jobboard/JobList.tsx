"use client";

// กำหนด prop types สำหรับ component JobList
interface JobListProps {
  data: any[]; // ข้อมูลที่ดึงมาจากฐานข้อมูล
  search: string; // ข้อความค้นหาที่ใช้กรองข้อมูล
  category: string; // หมวดหมู่ที่ใช้กรองข้อมูล
  deadline: string; // กำหนดเวลาที่ใช้กรองข้อมูล
  formatDate: (dateString: string) => string; // ฟังก์ชันสำหรับ format วันที่
}

// Component JobList จะรับ props สำหรับแสดงและกรองรายการงาน
export default function JobList({
  data,
  search,
  category,
  deadline,
  formatDate,
}: JobListProps) {
  return (
    <div className="border-x-[0.5px] border-light bg-white text-secondary">
      {data && data.length > 0 ? ( // ตรวจสอบว่ามีข้อมูลใน array หรือไม่
        data
          // กรองข้อมูลตามการค้นหา หมวดหมู่ และกำหนดเวลา
          .filter((note) => {
            // กรองโดยชื่อผู้ใช้ (search)
            const matchesSearch =
              search.toLowerCase() === "" || // ถ้าไม่มี search ใดๆ ก็แสดงทั้งหมด
              (note.users &&
                note.users.username &&
                note.users.username
                  .toLowerCase()
                  .includes(search.toLowerCase())); // ตรวจสอบว่ามี users และ username ก่อนที่จะค้นหา

            // กรองโดยหมวดหมู่ (category)
            const matchesCategory =
              category === "" || note.work_catagory === category; // ถ้าไม่ได้เลือกหมวดหมู่ ก็แสดงทั้งหมด หรือถ้าเลือกก็จะแสดงเฉพาะงานในหมวดหมู่ที่ตรงกัน

            // กรองโดยกำหนดเวลาส่งงาน (deadline)
            const matchesDeadline =
              deadline === "" || note.work_deadline === deadline; // ถ้าไม่ได้เลือกกำหนดเวลา ก็แสดงทั้งหมด หรือถ้าเลือกก็จะแสดงเฉพาะงานที่ตรงกัน

            // คืนค่า true ถ้าข้อมูลตรงกับทั้ง search, category และ deadline
            return matchesSearch && matchesCategory && matchesDeadline;
          })
          // แสดงข้อมูลแต่ละชิ้นที่ผ่านการกรองแล้ว
          .map((note, index: number) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
              // แถวคู่วางเป็นพื้นหลังขาว และแถวคี่วางพื้นหลังเทา
            >
              <div className="flex justify-between text-center p-6">
                {/* ชื่อของงาน */}
                <div className="w-[36%] self-start flex">{note.work_name}</div>

                {/* หมวดหมู่ของงาน */}
                <div className="w-[16%]">{note.work_catagory}</div>

                {/* กำหนดเวลาส่งงาน */}
                <div className="w-[16%]">{note.work_deadline}</div>

                {/* งบประมาณของงาน */}
                <div className="w-[16%] ">{note.work_budget} ฿</div>

                {/* วันที่สร้างโพสต์ โดยใช้ฟังก์ชัน formatDate */}
                <div className="w-[16%]">{formatDate(note.created_at)}</div>
              </div>
              {/* เส้นแบ่งระหว่างรายการงาน */}
              <hr className="border-[0.5px] border-light" />
            </div>
          ))
      ) : (
        // ถ้าไม่มีข้อมูล (เช่น ข้อมูลไม่ตรงกับการกรอง) จะแสดงข้อความนี้
        <div className="text-center p-3 text-lg w-full">
          ไม่มีการเพิ่มงานเข้ามา
        </div>
      )}
    </div>
  );
}
