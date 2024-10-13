"use client";

import { useState, useEffect, SetStateAction } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"; // นำเข้า useRouter

import Image from "next/image";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import ProfileButton from "@/components/ProfileButtonProps";

export default function WorkDetail({ params }: { params: { id: string } }) {
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State สำหรับ modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const supabase = createClient();
  const router = useRouter(); // สร้าง router

  const fetchWorkDetails = async (id: string) => {
    const { data, error } = await supabase
      .from("FreelanceWork")
      .select("*, users (username, avatar_url, userdetails, id)")
      .eq("id", id)
      .single();

    if (data) {
      if (typeof data.work_ex === "string") {
        data.work_ex = JSON.parse(data.work_ex);
      }
      setWork(data);
    } else {
      console.error("Error fetching work details:", error);
    }
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

  const nextImage = () => {
    if (work.work_ex && currentImageIndex < work.work_ex.length - 3) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const openModal = (img: string) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };


  // ตรวจสอบว่าเป็นเจ้าของงานหรือไม่
  const isOwner = work?.users?.id === userId;

  const handleDelete = async () => {
    const { error } = await supabase
      .from("FreelanceWork")
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
        text: "ไม่สามารถลบได้ โปรดลองอีกครั้ง",
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
              <div className="w-full bg-bg rounded-md shadow-md p-9 flex flex-col gap-7 tracking-wider min-[1024px]:sticky top-20">
                <h1 className="text-primary text-2xl font-semibold ">
                  {work.work_name}
                </h1>
                <hr className="border-light" />
                <p className="text-primary font-semibold">สิ่งที่คุณจะได้รับ</p>
                <textarea
                  className="text-third font-light p-2 outline-none h-32"
                  readOnly
                >
                  {work.work_Exdetail}
                </textarea>
                <div className="flex gap-3 text-lg">
                  <p className="text-primary font-semibold">ใช้เวลาทำงาน</p>
                  <p className="text-secondary">{work.work_deadline}</p>
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
            <div className="w-5/6 max-lg:w-full flex flex-col gap-4 tracking-wider">
              <div className="w-full flex flex-col gap-4 bg-bg p-5 shadow-md rounded-md">
                <div className="relative w-full h-[27rem] rounded-md max-lg:h-80">
                  <Image
                    src={work.work_mainimg}
                    alt={work.work_name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>

                {/* Additional Images */}
                {Array.isArray(work.work_ex) && work.work_ex.length > 0 && (
                  <div>
                    <div className="relative flex w-full gap-7 transition-transform duration-500 ease-in-out">
                      {work.work_ex
                        .slice(currentImageIndex, currentImageIndex + 3)
                        .map((img: string, index: number) => (
                          <div
                            key={index}
                            className="relative w-64 h-44 max-md:h-32 cursor-pointer"
                            onClick={() => openModal(img)} // Open modal on image click
                          >
                            <Image
                              src={img}
                              alt={`Additional Image ${index + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </div>
                        ))}
                      {/* Navigation Buttons */}
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 h-full bg-gray-800 bg-opacity-50 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300"
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                      >
                        &lt;
                      </button>

                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-full bg-gray-800 bg-opacity-50 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300"
                        onClick={nextImage}
                        disabled={currentImageIndex >= work.work_ex.length - 3}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                )}

                {/* Modal for displaying the selected image */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-4/6 rounded-lg bg-bg h-[45rem] max-lg:w-5/6 max-lg:h-[40rem]">
                      <button
                        className="absolute text-bg text-4xl z-[1] top-2 right-6 hover:text-primary duration-300"
                        onClick={closeModal}
                      >
                        &times;
                      </button>
                      <div className="relative w-full h-full z-[0]">
                        <Image
                          src={selectedImage}
                          alt="Profile"
                          className="rounded-md"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-secondary p-5 bg-bg rounded-md shadow-md">
                <div className="p-3 flex justify-between">
                  <h1 className="text-primary font-semibold text-3xl w-4/6">
                    {work.work_name}
                  </h1>

                  <div className="flex flex-col gap-5 mt-5">
                    <div className="flex gap-3">
                      <p className="text-primary font-semibold">ใช้เวลาทำงาน</p>
                      <p>{work.work_deadline}</p>
                    </div>
                    <div className="flex gap-3">
                      <p className="text-primary font-semibold">เรทราคา</p>
                      <p className="text-baht">{work.work_budget} ฿</p>
                    </div>
                  </div>
                </div>
                <hr className="border-light my-5" />
                <div className="w-full p-3 flex flex-col gap-5">
                  <h1 className="text-primary font-semibold text-xl">
                    ขั้นตอนการทำงาน
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
                    สิ่งที่คุณจะได้รับ
                  </h1>
                  <textarea
                    className="font-light p-2 outline-none w-full text-lg"
                    rows={Math.min(
                      10,
                      work.work_Exdetail.split("\n").length + 4
                    )} // กำหนด rows ตามความยาวของข้อความ
                    readOnly
                  >
                    {work.work_Exdetail}
                  </textarea>
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
