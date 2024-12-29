// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@/utils/supabase/client";
// import Image from "next/image";
// import { useUser } from "@/hooks/useUser";
// import Link from "next/link";
// import ShowWork from "@/components/ShowWork";
// import Footer from "@/components/Footer";
// import EditProfileForm from "./Edit/EditProfileForm";
// export default function User_Profile() {
//   const supabase = createClient();
//   const useuserData = useUser();

//   const [userData, setUserData] = useState<any>(null);
//   const [works, setWorks] = useState<any[]>([]);

//   const [boards, setBoards] = useState<any[]>([]);
//   const [invitedBoards, setInvitedBoards] = useState<any[]>([]);

//   const [profileImage, setProfileImage] = useState("/De_Profile.jpeg");
//   const [username, setUsername] = useState("");

//   const [showEdit, setShowEdit] = useState(false); // State สำหรับเปิดปิด modal
//   const [showWorks, setShowWorks] = useState(true); // เพิ่ม state สำหรับจัดการการแสดง ShowWork

//   const useuser = useuserData?.user;
//   const isUserLoading = useuserData?.isLoading;
//   const userError = useuserData?.error;

//   // Fetch user data
//   const fetchUserData = async () => {
//     try {
//       const { data: userData, error } = await supabase
//         .from("users")
//         .select("username, avatar_url")
//         .eq("id", useuser.id)
//         .limit(1)
//         .single();
//       if (error) throw error;
//       if (userData) {
//         setUserData(userData);
//         setUsername(userData.username);
//         setProfileImage(userData.avatar_url || "/De_Profile.jpeg");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // Fetch user works
//   const fetchWorks = async () => {
//     try {
//       const { data: works, error } = await supabase
//         .from("FreelanceWork")
//         .select("*, users (username, avatar_url)")
//         .eq("user_id", useuser.id)
//         .order("created_at", { ascending: false });
//       if (error) throw error;
//       setWorks(works || []);
//     } catch (error) {
//       console.error("Error fetching works:", error);
//     }
//   };

  

//   if (isUserLoading || !useuser) {
//     return <div>Loading...</div>;
//   }

//   if (userError) {
//     return <div>Error fetching user: </div>;
//   }

//   return (
//     <div className="w-full">
//       <div className="px-10 flex flex-col gap-5 max-sm:px-3">
//         <div className="bg-bg flex p-10 gap-5 rounded-md max-sm:flex-col items-center">
//           {userData?.avatar_url ? (
//             <div className="relative w-24 h-24 max-sm:w-16 max-sm:h-16 rounded-full">
//               <Image
//                 className="rounded-full"
//                 src={userData.avatar_url}
//                 alt="Avatar"
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>
//           ) : (
//             <div className="relative w-24 h-24 max-sm:w-16 max-sm:h-16 rounded-full">
//               <Image
//                 className="rounded-full"
//                 src="/De_Profile.jpeg"
//                 alt="Avatar"
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>
//           )}
//           <div className="flex flex-col gap-5 tracking-wide max-sm:items-center">
//             {userData?.username ? (
//               <p className="text-text text-2xl flex text-center max-sm:text-lg">
//                 {userData.username}
//               </p>
//             ) : (
//               <p className="text-text text-2xl flex text-center max-sm:text-lg">
//                 ไม่มีชื่อ
//               </p>
//             )}
//             <div className="">
//               <button className="btn bg-pain border-white text-white px-8 hover:bg-purple-800 max-sm:text-sm max-sm:px-2">
//                 <Link href="/User/Article">เพิ่มบทความ</Link>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="w-full flex">
//           <div className="w-full flex bg-bg rounded-md">
//             <div className="flex justify-evenly text-lg py-3 w-full">
//               <h1
//                 className={`cursor-pointer transition-all duration-300 pb-2 ${
//                   showEdit
//                     ? "text-pain border-b-2 border-pain"
//                     : "text-third hover:text-pain hover:border-pain"
//                 }`}
//                 onClick={() => {
//                   setShowEdit(true);
//                   setShowWorks(false);
//                 }}
//               >
//                 โปรไฟล์
//               </h1>
//               <h1
//                 className={`cursor-pointer transition-all duration-300 pb-2 ${
//                   showWorks
//                     ? "text-pain border-b-2 border-pain"
//                     : "text-third hover:text-pain hover:border-pain"
//                 }`}
//                 onClick={() => {
//                   setShowWorks(true);
//                   setShowEdit(false);
//                 }}
//               >
//                 ผลงาน
//               </h1>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-5 max-lg:flex-col">
//           <div className="w-3/4 max-lg:w-full">
//             <div className="w-full">
//               {showWorks && (
//                 <div>
//                   {works && works.length > 0 ? (
//                     <div className="grid grid-cols-3 grid-rows-1 gap-4 max-lg:grid-cols-1 bg-bg rounded-md p-5">
//                       {works.map((work) => (
//                         <ShowWork key={work.id} work={work} />
//                       ))}
//                     </div>
//                   ) : (
//                     <p>คุณยังไม่มีงานที่เพิ่มในระบบ</p>
//                   )}
//                 </div>
//               )}
//               {showEdit && ( // ตรวจสอบเงื่อนไข showEdit
//                 <div className="">
//                   <EditProfileForm user={userData} />
//                 </div>
//               )}
//             </div>
//           </div>

          
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div className='Page text-4xl'>กำลังแก้ไข...</div>
  )
}
