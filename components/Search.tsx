"use client";

// กำหนด prop types สำหรับ component Search
interface SearchProps {
  search: string; // ข้อความค้นหาที่ใช้ในการกรอง
  setSearch: (value: string) => void; // ฟังก์ชันสำหรับอัปเดตข้อความค้นหา
  category: string; // หมวดหมู่ที่เลือกสำหรับกรองข้อมูล
  setCategory: (value: string) => void; // ฟังก์ชันสำหรับอัปเดตหมวดหมู่ที่เลือก
  deadline: string; // เวลาที่เลือกสำหรับกรองข้อมูล
  setDeadline: (value: string) => void; // ฟังก์ชันสำหรับอัปเดตเวลาที่เลือก
}

// Component Search สำหรับแสดงฟิลด์การค้นหาและตัวกรองต่างๆ
export default function Search({
  search, // ข้อความค้นหาจาก state
  setSearch, // ฟังก์ชันที่ใช้เปลี่ยนค่าข้อความค้นหา
  category, // หมวดหมู่ที่เลือกจาก state
  setCategory, // ฟังก์ชันที่ใช้เปลี่ยนค่าหมวดหมู่
  deadline, // เวลาส่งงานที่เลือกจาก state
  setDeadline, // ฟังก์ชันที่ใช้เปลี่ยนค่าเวลาส่งงาน
}: SearchProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-5">
        {/* Dropdown สำหรับเลือกหมวดหมู่ */}
        <select
          name="category"
          value={category} // ค่าที่ถูกเลือกใน dropdown
          onChange={(e) => setCategory(e.target.value)} // เปลี่ยนหมวดหมู่เมื่อมีการเลือกใหม่
          className="cursor-pointer my-5 border border-primary w-40 p-2 text-xl rounded-lg outline-none text-primary"
        >
          <option value="">หมวดหมู่</option>
          <option value="ไม่มีกำหนด">ไม่มีกําหนด</option>
          <option value="ออกแบบกราฟฟิก">ออกแบบกราฟฟิก</option>
          <option value="สถาปัตย์และวิศวกรรม">สถาปัตย์และวิศวกรรม</option>
          <option value="เว็บไซต์และเทคโนโลยี">เว็บไซต์และเทคโนโลยี</option>
          <option value="การตลาดและโฆษณา">การตลาดและโฆษณา</option>
          <option value="งานศิลปะ">งานศิลปะ</option>
          <option value="ภาพและรูปถ่าย">ภาพและรูปถ่าย</option>
          <option value="คอร์สการเรียนรู้">คอร์สการเรียนรู้</option>
          <option value="บทความ">บทความ</option>
          <option value="การเดินทางและท่องเที่ยว">
            การเดินทางและท่องเที่ยว
          </option>
          <option value="สุขภาพ">สุขภาพ</option>
          <option value="ดนตรี">ดนตรี</option>
          <option value="อาหารและเครื่องดื่ม">อาหารและเครื่องดื่ม</option>
          <option value="ธรรมชาติ">ธรรมชาติ</option>
        </select>

        {/* Dropdown สำหรับเลือกเวลาส่งงาน */}
        <select
          name="work_deadline"
          value={deadline} // ค่าที่ถูกเลือกใน dropdown
          onChange={(e) => setDeadline(e.target.value)} // เปลี่ยนกำหนดเวลาส่งงานเมื่อมีการเลือกใหม่
          className="cursor-pointer my-5 border border-primary w-44 p-2 text-xl rounded-lg outline-none text-primary"
        >
          <option value="">ระยะเวลาทำงาน</option>
          <option value="ไม่มีกำหนด">ไม่มีกําหนด</option>
          <option value="3-5 วัน">3-5 วัน</option>
          <option value="1 อาทิตย์">1 อาทิตย์</option>
          <option value="2 อาทิตย์">2 อาทิตย์</option>
          <option value="1 เดือน">1 เดือน</option>
          <option value="3 เดือน">3 เดือน</option>
        </select>
      </div>

      {/* เส้นแบ่ง */}
      <hr className="border-light rounded-full my-3" />

      {/* ฟิลด์สำหรับค้นหาชื่อฟรีแลนซ์ */}
      <input
        type="text"
        name="search"
        value={search} // ค่าที่ถูกพิมพ์ลงในฟิลด์ค้นหา
        onChange={(e) => setSearch(e.target.value)} // อัปเดตข้อความค้นหาเมื่อผู้ใช้พิมพ์
        className="my-5 border border-light w-[40%] p-3 text-xl rounded-lg outline-none text-primary max-md:w-full placeholder-third"
        placeholder="ค้นหาชื่อฟรีแลนซ์..." // ข้อความ placeholder เมื่อฟิลด์ว่าง
      />
    </div>
  );
}
