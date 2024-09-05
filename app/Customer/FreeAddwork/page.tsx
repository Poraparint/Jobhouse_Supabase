// FreeAddwork.tsx
"use client";
import { addWork } from "./FAddwork";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

function FreeAddwork() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDelete = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const deadline = formData.get("work_deadline") as string;

    if (!deadline) {
      formData.set("work_deadline", "-");
    }

    files.forEach((file, index) => {
      formData.append(`work_ex_${index}`, file);
    });

    const newId = await addWork(formData);

    if (newId) {
      Swal.fire({
        icon: "success",
        title: "เพิ่มงานสำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        router.push(`/Customer/Freelance_product/${newId}`);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเพิ่มงานได้ โปรดลองอีกครั้ง",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="Page bg-white border border-secondary shadow-xl rounded-md w-[90%] p-10 mb-10">
      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-primary font-semibold text-3xl mb-9">บอร์ดประกาศงาน</h1>
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
          placeholder="รายละเอียดงานของคุณ"
          className="h-[10rem] w-full outline-none border border-third rounded-md p-3 text-lg text-secondary"
          required
        ></textarea>
        <div className="flex justify-between gap-9 max-lg:flex-wrap">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-primary text-xl">รูปผลงานของฉัน</h1>
            <div
              className="border border-third rounded-md p-2 text-lg text-secondary h-[20rem] flex items-center justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleClick}
            >
              <input
                type="file"
                name="work_ex"
                className="hidden"
                onChange={handleFileChange}
                multiple
                ref={fileInputRef}
              />
              <div className="text-center">
                {files.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {files.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={(e) => handleDelete(index, e)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary">
                    Drag & Drop files here or click to upload
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="ml-5 text-primary text-xl">รายละเอียด</h1>
          <textarea
            name="work_Exdetail"
            placeholder="รายละเอียดงานของคุณ"
            className="h-[3rem] w-full outline-none border border-third rounded-md p-3 text-lg text-secondary"
          ></textarea>
        </div>
        <div className="flex justify-between gap-9 max-lg:flex-wrap">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-primary text-xl">หมวดหมู่งาน</h1>
            <select
              className="border text-lg border-third p-2 rounded-md text-secondary"
              name="work_catagory"
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
            <h1 className="ml-5 text-primary text-xl">กําหนดส่งงาน</h1>
            <select
              className="border text-lg border-third bg-primary p-2 rounded-md text-white"
              name="work_deadline"
              required
            >
              <option value="3-5 วัน">3-5 วัน</option>
              <option value="1 อาทิตย์">1 อาทิตย์</option>
              <option value="2 อาทิตย์">2 อาทิตย์</option>
              <option value="1 เดือน">1 เดือน</option>
              <option value="3 เดือน">3 เดือน</option>
            </select>
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-5">
          <h1 className="ml-5 text-primary text-xl">งบประมาณ</h1>
          <input
            name="work_budget"
            type="text"
            placeholder="ระบุจำนวนเงินแลกเปลี่ยน"
            className="outline-none w-full border border-third rounded-md p-2 text-lg text-secondary"
            required
          />
        </div>
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

export default FreeAddwork;
