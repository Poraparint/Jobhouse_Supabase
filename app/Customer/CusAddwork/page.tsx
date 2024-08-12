"use client"
import { addWork } from "./Addwork";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function CusAddwork() {

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // ตรวจสอบว่า work_deadline มีการเลือกหรือไม่ ถ้าไม่ให้แสดง "-"
    const deadline = formData.get("work_deadline") as string;
    if (!deadline) {
      formData.set("work_deadline", "-");
    }

    const result = await addWork(formData);

    if (result) {
      Swal.fire({
        icon: "success",
        title: "เพิ่มงานสำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        // Redirect after the alert
        router.push("/Customer/C_Pro_Edit");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเพิ่มงานได้ โปรดลองอีกครั้ง",
      });
    }
  };

  return (
    <div className="Page bg-white border border-secondary shadow-xl rounded-md w-[90%] p-10">
      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-primary font-semibold text-3xl mb-9">
          บอร์ดประกาศงาน
        </h1>
        <h1 className="ml-5 text-primary text-xl">ชื่องาน</h1>
        <input
          name="work_name"
          type="text"
          placeholder="ชื่องานของคุณ"
          className="w-full text-secondary border border-third rounded-md p-2 text-lg outline-none"
          required
        />
        <h1 className="ml-5 text-primary text-xl">รายละเอียด</h1>
        <textarea
          name="work_detail"
          placeholder="รายละเอียดงานของคุณ "
          className="h-[10rem] w-full outline-none border border-third rounded-md p-3 text-lg text-secondary"
          required
        ></textarea>
        <div className="flex justify-between gap-9 max-lg:flex-wrap">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-primary text-xl">
              ตัวอย่างผลงานที่ต้องการ
            </h1>
            <input
              name="work_ex"
              type="text"
              placeholder="ตย."
              className="outline-none w-full border border-third rounded-md p-2 text-lg text-secondary"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-5 ">
            <h1 className="ml-5 text-primary text-xl">งบประมาณ</h1>
            <input
              name="work_budget"
              type="text"
              placeholder="ระบุจำนวนเงินแลกเปลี่ยน"
              className="outline-none w-full border border-third rounded-md p-2 text-lg text-secondary"
              required
            />
          </div>
        </div>
        <div className="flex justify-between gap-9 max-lg:flex-wrap">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-primary text-xl">หมวดหมู่งาน</h1>
            <select
              className="border text-lg border-third p-2 rounded-md text-secondary"
              name="work_catagory"
              id=""
              required
            >
              <option value="ออกแบบกราฟฟิก">ออกแบบกราฟฟิก</option>
              <option value="สถาปัตย์และวิศวกรรม">สถาปัตย์และวิศวกรรม</option>
              <option value="เว็บไซต์และเทคโนโลยี">เว็บไซต์และเทคโนโลยี</option>
              <option value="การตลาดและโฆษณา">การตลาดและโฆษณา</option>
              <option value="ภาพและรูปถ่าย">ภาพและรูปถ่าย</option>
              <option value="คอร์สการเรียนรู้">คอร์สการเรียนรู้</option>
              <option value="บทความ">บทความ</option>
              <option value="วางแพลนเที่ยว">วางแพลนเที่ยว</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="flex gap-3 items-center">
              <h1 className="ml-5 text-primary text-xl">กำหนดส่งงาน</h1>
              <h1 className="text-third">*ถ้าไม่มีไม่ต้องใส่</h1>
            </div>

            <input
              name="work_deadline"
              type="date"
              className="outline-none w-full border border-third rounded-md p-2 text-lg text-secondary"
            />
          </div>
        </div>
        <div className="flex justify-end text-xl gap-5 mt-14">
          <button className="border border-secondary text-secondary p-2 rounded-md">
            ย้อนกลับ
          </button>
          <button
            type="submit"
            className="border border-primary bg-primary text-white py-2 px-4 rounded-md"
          >
            ส่งงาน
          </button>
        </div>
      </form>
    </div>
  );
}

export default CusAddwork;
