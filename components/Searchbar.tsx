"use client";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  deadline: string;
  setDeadline: (value: string) => void;
}

export default function Search({
  search,
  setSearch,
  category,
  setCategory,
  deadline,
  setDeadline,
}: SearchProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-5">
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="cursor-pointer my-5 border border-primary w-40 p-2 text-xl rounded-lg outline-none text-primary"
        >
          <option value="">หมวดหมู่</option>
          <option value="ไม่มีกำหนด">ไม่มีกําหนด</option>
          <option value="ออกแบบกราฟฟิก">ออกแบบกราฟฟิก</option>
          <option value="สถาปัตย์และวิศวกรรม">สถาปัตย์และวิศวกรรม</option>
          <option value="เว็บไซต์และเทคโนโลยี">เว็บไซต์และเทคโนโลยี</option>
          <option value="การตลาดและโฆษณา">การตลาดและโฆษณา</option>
          <option value="ภาพและรูปถ่าย">ภาพและรูปถ่าย</option>
          <option value="คอร์สการเรียนรู้">คอร์สการเรียนรู้</option>
          <option value="บทความ">บทความ</option>
          <option value="วางแพลนเที่ยว">วางแพลนเที่ยว</option>
        </select>
        <select
          name="work_deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
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
      <hr className="border-light rounded-full my-3" />
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="my-5 border border-primary w-[40%] p-3 text-xl rounded-lg outline-none text-primary max-md:w-full placeholder-third"
        placeholder="ค้นหาชื่อฟรีแลนซ์..."
      />
    </div>
  );
}
