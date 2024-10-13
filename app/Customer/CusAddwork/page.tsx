"use client"
import { addWork } from "./Addwork";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function CusAddwork() {

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await addWork(formData);

    if (result) {
      // ใช้ Swal.mixin() เพื่อสร้างการแจ้งเตือน
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "เพิ่มงานสำเร็จ",
      }).then(() => {
        // Redirect หลังจากแสดง toast
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
    <div className="Page bg-bg shadow-md rounded-md w-[90%] p-10 mb-9">
      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-primary font-semibold text-3xl mb-9">
          ประกาศหาฟรีแลนซ์
        </h1>
        <h1 className="ml-5 text-primary text-xl">ชื่องาน</h1>
        <input
          name="work_name"
          type="text"
          placeholder="ชื่องานของคุณ"
          className="w-full text-secondary border border-light rounded-md p-2 text-lg outline-none"
          required
        />
        <div className="flex justify-between gap-9 max-lg:flex-wrap">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-primary text-xl">หมวดหมู่งาน</h1>
            <select
              className="border text-lg border-light p-2 rounded-md text-secondary"
              name="work_catagory"
              id=""
              required
            >
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
              <option value="ดนตรี">คนตรี</option>
              <option value="อาหารและเครื่องดื่ม">อาหารและเครื่องดื่ม</option>
              <option value="ธรรมชาติ">ธรรมชาติ</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-primary text-xl">ส่งงานใน</h1>
            <input
              type="date"
              name="work_deadline"
              className="outline-none w-full border border-light rounded-md p-2 text-lg text-secondary"
              required
            />
          </div>
        </div>
        <div className="flex justify-between gap-9 max-lg:flex-wrap">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-primary text-xl">
              ตัวอย่างผลงานที่ต้องการ
            </h1>
            <input
              name="work_ex"
              type="text"
              placeholder="ตย."
              className="outline-none w-full border border-light rounded-md p-2 text-lg text-secondary"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-5 ">
            <h1 className="ml-5 text-primary text-xl">งบประมาณ</h1>
            <input
              name="work_budget"
              type="text"
              placeholder="ระบุจำนวนเงินแลกเปลี่ยน"
              className="outline-none w-full border border-light rounded-md p-2 text-lg text-secondary"
              required
            />
          </div>
        </div>

        <h1 className="ml-5 text-primary text-xl">รายละเอียด</h1>
        <textarea
          name="work_detail"
          placeholder="รายละเอียดงานของคุณ "
          className="h-[10rem] w-full outline-none border border-light rounded-md p-3 text-lg text-secondary"
          required
        ></textarea>
        <div className="flex justify-end text-xl gap-5 mt-14">
          <button
            type="submit"
            className="border border-primary bg-primary text-white py-2 px-8 rounded-md"
          >
            ส่งงาน
          </button>
        </div>
      </form>
    </div>
  );
}

export default CusAddwork;
