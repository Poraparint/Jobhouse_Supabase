"use client";
import { useState } from "react";
import { updateProfile } from "./action";
import Image from "next/image";
import Swal from "sweetalert2";


export default function EditProfileForm({ user }) {
  const [profileImage, setProfileImage] = useState(
    user.avatar_url || "/De_Profile.jpeg"
  );
  const [bgImage, setBgImage] = useState(user.bg_url || "/Fuji.jpeg");
  const [username, setUsername] = useState(user.username || "");
  const [userdetails, setUserDetails] = useState(user.userdetails || "");
  const [newImage, setNewImage] = useState<File | null>(null); // State สำหรับเก็บไฟล์รูปใหม่
  const [newBg, setNewBg] = useState<File | null>(null); // State สำหรับเก็บไฟล์รูปใหม่
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("userdetails", userdetails);
    if (newImage) {
      formData.append("profile", newImage);
    }
    if (newBg) {
      formData.append("bg", newBg); // Append new background image
    }

    try {
      const response = await updateProfile(formData);
      if (response.error) {
        setError(response.message);
      } else {
        Swal.fire({
          icon: "success",
          title: "อัปเดตโปรไฟล์สำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.reload(); // โหลดหน้าใหม่เมื่อทำการอัปเดตเสร็จสิ้น
        });
      }
    } catch (err) {
      setError("Error updating profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(user);

  return (
    <div className="">
      <div className="">
        <form className="p-3" onSubmit={handleProfileUpdate}>
          <h3 className="font-bold text-xl text-primary tracking-wide">
            แก้ไขโปรไฟล์
          </h3>
          <div className="py-4 flex max-lg:flex-col">
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex flex-col gap-5 items-center w-full p-5">
              <label
                htmlFor="profileImage"
                className="block text-lg text-primary font-semibold"
              >
                รูปโปรไฟล์
              </label>
              <div className="relative opacity-85 w-40 h-40 rounded-full hover:opacity-100 duration-150">
                <Image
                  className="rounded-full"
                  src={profileImage}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                />
                <input
                  type="file"
                  name="profileImage"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer border border-red-500"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setNewImage(file);
                    if (file) {
                      setProfileImage(URL.createObjectURL(file)); // แสดงภาพใหม่
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 items-center w-full p-5">
              <label
                htmlFor="bgImage"
                className="block text-lg text-primary font-semibold"
              >
                Background Image
              </label>
              <div className="relative w-full h-40 hover:opacity-90 duration-150">
                <Image
                  src={bgImage}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                />
                <input
                  type="file"
                  name="bgImage"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setNewBg(file);
                    if (file) {
                      setBgImage(URL.createObjectURL(file)); // Show new background image preview
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 items-center w-full p-5">
              <label
                htmlFor="username"
                className="font-semibold block text-lg text-primary"
              >
                ชื่อที่แสดงในระบบ
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={user.username || "แก้ไขชื่อของคุณ"} // แสดง placeholder เป็นค่าปัจจุบัน
                className="w-full border-secondary border py-3 rounded-md px-4 outline-none text-third"
              />
              <label
                htmlFor="username"
                className="block font-semibold text-lg text-primary"
              >
                รายละเอียดผู้ใช้
              </label>
              <textarea
                name="userdetails"
                value={userdetails}
                onChange={(e) => setUserDetails(e.target.value)}
                placeholder={user.user_details || "รายละเอียด"} // แสดง placeholder เป็นค่าปัจจุบัน
                className="w-full border-secondary border py-3 rounded-md px-4 outline-none h-40 text-third"
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="btn border-primary text-primary hover:border-white hover:text-white hover:bg-primary duration-300 px-6"
              disabled={loading}
            >
              {loading ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
