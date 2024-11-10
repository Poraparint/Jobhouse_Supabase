"use client"; 

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import ShowWork from "../../../components/ShowWork";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";

export default function C_Pro_Edit() {
  const supabase = createClient();
  const useuserData = useUser(); // ไม่ destructure ทันที

  const [userData, setUserData] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false); // State สำหรับเปิดปิด modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/De_Profile.jpeg");
  const [username, setUsername] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [showEdit, setShowEdit] = useState(false); // State สำหรับเปิดปิด modal
  const [showWorks, setShowWorks] = useState(true); // เพิ่ม state สำหรับจัดการการแสดง ShowWork
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useuser = useuserData?.user;
  const isUserLoading = useuserData?.isLoading;
  const userError = useuserData?.error;

  const fetchUserData = async () => {
    try {
      const { data: userData, error } = await supabase
        .from("users")
        .select("username, avatar_url")
        .eq("id", useuser.id)
        .limit(1)
        .single();
      if (error) throw error;
      if (userData) {
        setUserData(userData);
        setUsername(userData.username);
        setProfileImage(userData.avatar_url || "/De_Profile.jpeg");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // ฟังก์ชันสำหรับดึงข้อมูลงาน
  const fetchWorks = async () => {
    try {
      const { data: works, error } = await supabase
        .from("FreelanceWork")
        .select(
          "*, users (username, avatar_url)"
        )
        .eq("user_id", useuser.id) // ดึงข้อมูลงานที่สัมพันธ์กับ user_id ของผู้ใช้
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWorks(works || []); // บันทึกข้อมูลงาน
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };
  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("username", username);
    if (newImage) {
      formData.append("profile", newImage);
    }

    try {
      const response = await supabase
        .from("users")
        .update({
          username,
          avatar_url: newImage
            ? URL.createObjectURL(newImage)
            : userData.avatar_url,
        })
        .eq("id", useuser.id);

      if (response.error) {
        setError(response.error.message);
      } else {
        Swal.fire({
          icon: "success",
          title: "อัปเดตโปรไฟล์สำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      setError("Error updating profile: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (useuser && !isUserLoading) {
      fetchUserData();
      fetchWorks();
    }
  }, [useuser, isUserLoading]);

  // แสดงสถานะการโหลดหากข้อมูลยังไม่พร้อม
  if (isUserLoading || !useuser) {
    return <div>Loading...</div>;
  }

  // ถ้ามี error ในการดึงข้อมูล user
  if (userError) {
    return <div>Error fetching user: gay</div>;
  }

  if (!useuser) {
    return <div>User not logged in</div>;
  }

  return (
    <div className="w-full mt-14">
      <div>
        <div className="relative flex flex-col-reverse">
          <div className="bg-bg max-lg:bg-inherit absolute z-10 p-5 text-secondary rounded-lg top-40 left-10 shadow-md max-lg:w-5/6 max-lg:top-5 max-lg:shadow-none w-80">
            <div className="max-lg:flex justify-between gap-5">
              <div className="relative py-6 px-9 gap-5 flex flex-col items-center w-full max-lg:bg-bg max-lg:rounded-md max-lg:shadow-md max-lg:px-2">
                {userData?.avatar_url ? (
                  <div className="relative w-28 h-28 rounded-full max-lg:w-14 max-lg:h-14">
                    <Image
                      className="rounded-full"
                      src={userData.avatar_url}
                      alt="Avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-28 h-28 rounded-full max-lg:w-14 max-lg:h-14">
                    <Image
                      className="rounded-full"
                      src="/De_Profile.jpeg"
                      alt="Avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                {userData?.username ? (
                  <p className="font-medium text-xl text-secondary max-lg:text-base flex text-center">
                    {userData.username}
                  </p>
                ) : (
                  <p>ไม่มีชื่อ</p>
                )}

                <button
                  className="btn bg-white border-primary text-primary hover:border-white hover:text-white hover:bg-primary duration-300 px-8"
                  onClick={() => setShowModal(true)}
                >
                  เพิ่มงาน
                </button>
              </div>
              <hr className="border-[0.5px] border-light my-7 max-lg:hidden" />
              <div className="flex flex-col gap-3 w-full max-lg:bg-bg max-lg:rounded-md max-lg:shadow-md max-lg:p-5">
                {userData?.fb_url && (
                  <a
                    href={userData.fb_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-white text-primary w-full flex border justify-start gap-3 hover:text-white hover:bg-primary duration-200"
                  >
                    <i className="fa-brands fa-facebook text-3xl"></i>
                    <div className="border-l-[0.5px] border-primary text-lg px-4 font-medium">
                      Facebook
                    </div>
                  </a>
                )}
                {userData?.ig_url && (
                  <a
                    href={userData.ig_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-white text-pink-600 w-full flex border justify-start gap-3 hover:text-white hover:bg-pink-600 duration-200"
                  >
                    <i className="fa-brands fa-instagram text-3xl px-0.5"></i>
                    <div className="border-l-[0.5px] border-pink-600 text-lg px-4 font-medium">
                      Instagram
                    </div>
                  </a>
                )}
                {userData?.line_url && (
                  <a
                    href={userData.line_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-white text-baht w-full flex border justify-start gap-3 hover:text-white hover:bg-baht duration-200"
                  >
                    <i className="fa-brands fa-line text-3xl"></i>
                    <div className="border-l-[0.5px] border-baht text-lg px-4 font-medium">
                      Line
                    </div>
                  </a>
                )}
              </div>
              <hr className="border-[0.5px] border-light my-7 max-lg:hidden" />
            </div>

            <div className="p-3 bg-slate-50 w-full h-52 border border-light rounded-lg my-5 max-lg:hidden">
              {userData?.userdetails ? (
                <textarea
                  className="outline-none text-sm text-third h-full w-full bg-transparent tracking-wider"
                  value={userData.userdetails}
                ></textarea>
              ) : (
                <p>สามารถใส่ข้อมูลผู้ใช้ได้</p>
              )}
            </div>
          </div>
          {userData?.bg_url ? (
            <div className="w-full h-[17rem] relative max-lg:h-[21rem]">
              <Image
                className=""
                src={userData.bg_url}
                alt="BG"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="w-full h-[17rem] relative max-lg:h-[21rem]">
              <Image
                className=""
                src="/DefaultBG.jpeg"
                alt="BG"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </div>

        <div className="w-full flex">
          <div className="w-full flex justify-end bg-white border-b border-gray-200 shadow-md">
            <div className="flex justify-evenly text-lg py-3 max-lg:w-full w-[80%]">
              <h1
                className={`cursor-pointer transition-all duration-300 pb-2 ${
                  showEdit
                    ? "text-primary border-b-2 border-primary"
                    : "text-third hover:text-primary hover:border-primary"
                }`}
                onClick={() => {
                  setShowEdit(true);
                  setShowWorks(false);
                }}
              >
                โปรไฟล์
              </h1>
              <h1
                className={`cursor-pointer transition-all duration-300 pb-2 ${
                  showWorks
                    ? "text-primary border-b-2 border-primary"
                    : "text-third hover:text-primary hover:border-primary"
                }`}
                onClick={() => {
                  setShowWorks(true);
                  setShowEdit(false);
                }}
              >
                ผลงาน
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-10">
          <div className="w-[70%] max-lg:w-full">
            {showWorks && (
              <div>
                {works && works.length > 0 ? (
                  <div className="grid grid-cols-3 grid-rows-1 gap-4 max-lg:grid-cols-1 mt-8 bg-white shadow-md rounded-md p-5">
                    {works.map((work) => (
                      <ShowWork key={work.id} work={work} />
                    ))}
                  </div>
                ) : (
                  <p>คุณยังไม่มีงานที่เพิ่มในระบบ</p>
                )}
              </div>
            )}
            {showEdit && ( // ตรวจสอบเงื่อนไข showEdit
              <div
                className="modal modal-open"
                onClick={() => setIsModalOpen(false)} // Close on background click
              >
                <div
                  className="modal-box bg-bg text-text"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                  <form onSubmit={handleProfileUpdate}>
                    <div className="flex flex-col gap-3">
                      <label className="block text-sm font-medium">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input w-full bg-bg border-text"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label className="block text-sm font-medium ">
                        Profile Image
                      </label>
                      <div className="relative w-24 h-24 rounded-full hover:opacity-90 hover:scale-105 duration-150">
                        <Image
                          className="rounded-full"
                          src={profileImage}
                          alt="Profile"
                          layout="fill"
                          objectFit="cover"
                        />
                        <input
                          type="file"
                          className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setNewImage(file);
                            if (file) {
                              setProfileImage(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-5">
                      <button
                        type="submit"
                        className="btn bg-pain text-bg border-bg"
                      >
                        บันทึก
                      </button>
                    </div>
                  </form>
                  <div className="flex justify-end mt-4">
                    <button
                      className="btn bg-bg text-text p-4"
                      onClick={() => setIsModalOpen(false)} // Close modal
                    >
                      ปิด
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-20">
          {showModal && (
            <div className="modal modal-open">
              <div className="modal-box flex flex-col gap-5 p-5 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold tracking-normal text-secondary mb-6">
                  เลือกประเภทงาน
                </h2>
                <div className="flex justify-evenly">
                  <Link href="/Customer/CusAddwork">
                    <button className="btn btn-primary w-full font-normal text-white tracking-wide">
                      ประกาศหาฟรีแลนซ์
                    </button>
                  </Link>
                  <Link href="/Customer/FreeAddwork">
                    <button className="btn btn-primary w-full font-normal text-white tracking-wide px-7">
                      เพิ่มงานของคุณ
                    </button>
                  </Link>
                </div>
                <div className="modal-action">
                  <button
                    className="btn border-secondary text-secondary hover:bg-slate-100 duration-100"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
