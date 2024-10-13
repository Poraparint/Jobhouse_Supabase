"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"; // นำเข้า useRouter

import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import ProfileButton from "@/components/ProfileButtonProps";

export default function CWork({ params }: { params: { id: string } }) {
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State สำหรับ modal
  const supabase = createClient();
    const router = useRouter(); // สร้าง router
    
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("th-TH", options);
    };


  const fetchWorkDetails = async (id: string) => {
    const { data, error } = await supabase
      .from("cuswork")
      .select("*, users (username, avatar_url, userdetails, id)")
      .eq("id", id)
      .single();

      setWork(data);
    setLoading(false);
  };

  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id); // ดึง UID ของผู้ใช้ปัจจุบัน
    }
  };

  useEffect(() => {
    fetchWorkDetails(params.id);
    fetchUser();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // ตรวจสอบว่าเป็นเจ้าของงานหรือไม่
  const isOwner = work?.users?.id === userId;

  const handleDelete = async () => {
    const { error } = await supabase
      .from("cuswork")
      .delete()
      .eq("id", work.id);

      if (!error) {
        
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
            title: "ลบงานสำเร็จ",
          }).then(() => {
            // Redirect หลังจากแสดง toast
            router.push("/Customer/C_Pro_Edit");
          });        
          
    } else {
          console.error("Error deleting work:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบงานได้ โปรดลองอีกครั้ง",
          });
    }
  };

  const confirmDelete = () => {
    handleDelete();
    setShowDeleteModal(false); // ปิด modal หลังจากลบ
  };

  return (
    <div className="Page w-full">
      {work && (
        <div className="flex justify-center">
          <div className="w-[90%] flex flex-row-reverse p-8 gap-4 max-lg:flex-col">
            <div className="flex flex-col gap-5 w-2/6 max-lg:w-full">
              <div className="w-full bg-bg rounded-md shadow-md p-9 flex flex-col gap-7 tracking-wider min-[1024px]:sticky top-20 text-secondary">
                <h1 className="text-primary text-2xl font-semibold ">
                  {work.work_name}
                </h1>
                <hr className="border-light" />
                <h1 className="text-primary font-semibold text-xl">บรีฟงาน</h1>
                <textarea
                  className="font-light p-2 outline-none w-full text-lg h-32 "
                  readOnly
                >
                  {work.work_detail}
                </textarea>

                <div className="flex gap-3 text-lg">
                  <p className="text-primary font-semibold">กำหนดส่งงาน</p>
                  <p className="text-secondary">
                    {formatDate(work.work_deadline)}
                  </p>
                </div>
                <div className="flex gap-3 text-lg">
                  <p className="text-primary font-semibold">เรทราคา</p>
                  <p className="text-baht">{work.work_budget} ฿</p>
                </div>
                <hr className="border-light" />
                <button className="btn btn-primary text-white">
                  คัดลอกลิ้งค์
                </button>
              </div>
            </div>
            <div className="w-4/6 max-lg:w-full flex flex-col gap-4 tracking-wider">
              <div className="text-secondary p-5 bg-bg rounded-md shadow-md">
                <div className="p-3">
                  <h1 className="text-primary font-semibold text-3xl w-4/6">
                    {work.work_name}
                  </h1>
                </div>
                <hr className="border-light my-5" />
                <div className="w-full p-3 flex flex-col gap-5">
                  <h1 className="text-primary font-semibold text-xl">
                    บรีฟงาน
                  </h1>
                  <textarea
                    className="font-light p-2 outline-none w-full text-lg"
                    rows={Math.min(10, work.work_detail.split("\n").length + 4)} // กำหนด rows ตามความยาวของข้อความ
                    readOnly
                  >
                    {work.work_detail}
                  </textarea>
                </div>
                <hr className="border-light my-5" />
                <div className="w-full p-3 flex flex-col gap-5">
                  <h1 className="text-primary font-semibold text-xl">
                    ตัวอย่างผลงานที่ต้องการ
                  </h1>
                  <p>{work.work_ex}</p>
                </div>
                <hr className="border-light my-5" />
                <div className="w-full p-3 flex flex-col gap-5 text-lg">
                  <div className="flex gap-3">
                    <p className="text-primary font-semibold">กำหนดส่งงาน</p>
                    <p>{formatDate(work.work_deadline)}</p>
                  </div>
                  <div className="flex gap-3">
                    <p className="text-primary font-semibold">เรทราคา</p>
                    <p className="text-baht">{work.work_budget} ฿</p>
                  </div>
                </div>
              </div>
              <ProfileButton
                username={work.users.username}
                avatarUrl={work.users.avatar_url}
                userDetails={work.users.userdetails}
              />
              {/* แสดงปุ่มลบถ้าผู้ใช้ปัจจุบันเป็นเจ้าของงาน */}
              {isOwner && (
                <div className="flex justify-end">
                  <button
                    className="btn bg-danger text-white w-1/4 hover:bg-red-900"
                    onClick={() => setShowDeleteModal(true)} // เปิด modal เมื่อคลิก
                  >
                    ลบงานนี้
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal สำหรับยืนยันการลบ */}
      {showDeleteModal && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box bg-white p-5 rounded shadow-lg text-secondary">
            <h2 className="text-xl font-semibold text-danger mb-4">
              ยืนยันการลบงานนี้
            </h2>
            <p className="my-4 ">
              คุณแน่ใจหรือไม่ว่าต้องการลบงานนี้?
              คุณจะไม่สามารถกู้คืนโพสต์งานนี้ได้!
            </p>
            <div className="flex justify-end">
              <button
                className="btn bg-danger mr-2 text-bg hover:bg-red-900"
                onClick={confirmDelete}
              >
                ยืนยัน
              </button>
              <button
                className="btn bg-bg"
                onClick={() => setShowDeleteModal(false)} // ปิด modal เมื่อคลิก
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
