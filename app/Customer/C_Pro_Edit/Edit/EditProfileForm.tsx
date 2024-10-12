"use client";
import { useState } from "react";
import { updateProfile } from "./action";
import Image from "next/image";
import Swal from "sweetalert2";


export default function EditProfileForm({ user }) {
  const [profileImage, setProfileImage] = useState(
    user.avatar_url || "/De_Profile.jpeg"
  );
  const [bgImage, setBgImage] = useState(user.bg_url || "/DefaultBG.jpeg");
  const [username, setUsername] = useState(user.username || "");
  const [userdetails, setUserDetails] = useState(user.userdetails || "");
  const [fb_url, setFb_url] = useState(user.fb_url || "");
  const [ig_url, setIg_url] = useState(user.ig_url || "");
  const [line_url, setLine_url] = useState(user.line_url || "");
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
    formData.append("fb_url", fb_url);
    formData.append("ig_url", ig_url);
    formData.append("line_url", line_url);
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
    <div className="bg-bg p-7 rounded-md shadow-md border-[0.5px] border-light">
      <form
        className="flex relative pt-20 justify-between tracking-wide"
        onSubmit={handleProfileUpdate}
      >
        <h1 className="font-semibold text-2xl text-primary absolute top-0 left-0">
          ข้อมูลบัญชี
        </h1>
        <div className="flex flex-col gap-3 w-full p-5 text-secondary">
          <label htmlFor="username" className="block text-lg ml-5">
            ชื่อที่แสดงในระบบ
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={user.username || "แก้ไขชื่อของคุณ"} // แสดง placeholder เป็นค่าปัจจุบัน
            className="w-full bg-white border-secondary border-[0.5px] py-3 rounded-md px-4 outline-none text-primary"
          />
          <hr className="border-[0.5px] border-light my-5" />
          <label htmlFor="link" className="block text-lg ml-5">
            ช่องทางติดต่อ
          </label>
          <div className="border-primary bg-white border rounded-md flex text-primary p-1">
            <i className="fa-brands fa-facebook text-3xl p-2"></i>
            <input
              type="text"
              name="fb_url"
              value={fb_url}
              onChange={(e) => setFb_url(e.target.value)}
              placeholder={user.fb_url || "เพิ่มช่องทางติดต่อ"} // แสดง placeholder เป็นค่าปัจจุบัน
              className="w-full px-4 outline-none border-l-[0.5px] border-primary"
            />
          </div>
          <div className="border-pink-700 bg-white border rounded-md flex text-pink-700 p-1">
            <i className="fa-brands fa-instagram text-3xl py-2 px-2.5"></i>
            <input
              type="text"
              name="ig_url"
              value={ig_url}
              onChange={(e) => setIg_url(e.target.value)}
              placeholder={user.ig_url || "เพิ่มช่องทางติดต่อ"} // แสดง placeholder เป็นค่าปัจจุบัน
              className="w-full px-4 outline-none border-l-[0.5px] border-pink-700"
            />
          </div>
          <div className="border-baht bg-white border rounded-md flex text-baht p-1">
            <i className="fa-brands fa-line text-3xl p-2"></i>
            <input
              type="text"
              name="line_url"
              value={line_url}
              onChange={(e) => setLine_url(e.target.value)}
              placeholder={user.line_url || "เพิ่มช่องทางติดต่อ"} // แสดง placeholder เป็นค่าปัจจุบัน
              className="w-full px-4 outline-none border-l-[0.5px] border-baht"
            />
          </div>
          <hr className="border-[0.5px] border-light my-5" />
          <label htmlFor="username" className="block text-lg ml-5">
            รายละเอียดผู้ใช้
          </label>
          <textarea
            name="userdetails"
            value={userdetails}
            onChange={(e) => setUserDetails(e.target.value)}
            placeholder={user.user_details || "รายละเอียด"} // แสดง placeholder เป็นค่าปัจจุบัน
            className="w-full bg-white border-secondary border-[0.5px] py-3 rounded-md px-4 outline-none h-80 text-primary"
          />
        </div>
        <div className="w-full flex max-lg:flex-col">
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col gap-5 items-center w-full p-5">
            <label htmlFor="profileImage" className="block text-lg">
              รูปโปรไฟล์
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
                name="profileImage"
                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
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
            <label htmlFor="bgImage" className="block text-lg">
              รูปพื้นหลัง
            </label>
            <div className="relative w-full h-28 hover:opacity-90 hover:scale-105 duration-150">
              <Image
                src={bgImage}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="rounded-md border-[0.5px] border-secondary"
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
        </div>

        <div className="absolute right-0 top-0">
          <button
            type="submit"
            className="btn bg-white border-primary text-primary hover:border-white hover:text-white hover:bg-primary duration-300 px-6"
            disabled={loading}
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </form>
    </div>
  );
}
