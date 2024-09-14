"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const supabase = createClient();
  const [works, setWorks] = useState([]);
  const [images, setImages] = useState([]);
  const [sortOrder, setSortOrder] = useState("standard");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexBox2, setCurrentIndexBox2] = useState(0);

  const fetchImage = async () => {
    try {
      const { data: FreelanceWorks, error } = await supabase
        .from("FreelanceWork")
        .select("work_mainimg");

      if (error) throw error;

      const imagePromises = FreelanceWorks.map((FreelanceWork) =>
        supabase.storage.from("work_mainimg").getPublicUrl(FreelanceWork.work_mainimg)
      );

      const imageResults = await Promise.all(imagePromises);
      const images = imageResults.map(result => result.data.publicUrl);

      setImages(images);

      
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchWorks = async () => {
    try {
      const { data: FreelanceWork, error } = await supabase
        .from("FreelanceWork")
        .select(
          "user_id, work_name, work_detail, work_budget, work_catagory, work_deadline, created_at, work_mainimg, users (username)"
        );

      if (error) throw error;

      setWorks(FreelanceWork);
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  useEffect(() => {
    fetchWorks();
    fetchImage();
  }, []);

  const handleSortChange = (order) => {
    setSortOrder(order);

    let sortedWorks = [...works];
    if (order === "newest") {
      sortedWorks.sort((a, b) =>
        a.created_at && b.created_at
          ? new Date(b.created_at) - new Date(a.created_at)
          : 0
      );
    } else if (order === "oldest") {
      sortedWorks.sort((a, b) =>
        a.created_at && b.created_at
          ? new Date(a.created_at) - new Date(b.created_at)
          : 0
      );
    }

    setWorks(sortedWorks);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

 

  const handleArrowClickBox2 = (direction) => {
    setCurrentIndexBox2((prevIndex) => {
      if (direction === 'leftbox2') {
        return prevIndex > 0 ? prevIndex - 1 : works.length - 1;
      } else if (direction === 'rightbox2') {
        return prevIndex < works.length - 3 ? prevIndex + 1 : 0;
      }
      return prevIndex;
    });
  };
  console.log(images);

  return (
    <div className="flex flex-col">
      {/* BOX 1 */}
      <div className="flex flex-col p-10 text-3xl gap-4">
        <h1>แนะนำผลงานจากฟรีแลนซ์ประจำสัปดาห์</h1>
        <div className="relative flex justify-center">
          {images.length > 0 && (
            <div className="flex-shrink-0">
              <Image
                src={images[currentIndex]}
                alt={`Image from Supabase ${currentIndex}`}
                width={500}
                height={500}
                className="w-500 h-500 object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 mt-4">
  {[...Array(images.length)].map((_, i) => (
    <button
      key={i}
      className={`p-2`}
      onClick={() => handleIndicatorClick(i)}
    >
      <Image
        src={i === currentIndex ? "/Ellipse 36.png" : "/Ellipse 37.png"} 
        alt={`Indicator ${i}`}
        width={20}
        height={20}
        className="w-500 h-500 object-cover"
      />
    </button>
  ))}
</div>

      </div>

      {/* BOX 2 */} 
<div className="flex flex-col p-10 text-3xl gap-4">
  <h1>ผลงานจากฟรีแลนซ์คุณอาจสนใจ</h1>
  <div className="relative flex items-center">
    {/* Left Arrow */}
    <button
      className="absolute left-0 z-10 p-2 rounded-full"
      onClick={() => handleArrowClickBox2('leftbox2')}
    >
      <Image
        src="/Frame 271.png"
        width={40}
        height={40}
        alt="Left arrow icon"
      />
    </button>

    <div className="flex overflow-hidden w-full mx-16">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndexBox2 * 340}px)` }} 
      >
        {works.map((work, index) => (
          <div
            className="flex flex-col border border-black rounded-t-xl flex-none w-80 mx-2" 
            key={index}
          >
            <img
              src={images[index]}
              width={490}
              height={100}
              className="rounded-t-xl flex-1 object-cover "
              alt={`Sample work from a freelancer ${index}`}
            />
            <div className="text-secondary flex-none px-3 bg-white">
              <h1 className="text-xl px-1">{work.work_name}</h1>
              <h1 className="text-sm px-5">{work.work_catagory}</h1>
              <div className="flex">
                <div className="flex gap-20">
                  <div className="flex p-1 gap-3">
                    <Image
                      src="/Rectangle 879.png"
                      width={45}
                      height={45}
                      className="rounded-full"
                      alt={`Freelancer profile picture ${index}`}
                    />
                    <div>
                      <h1 className="text-xl text-primary line-clamp-1">
                        {work.users.username}
                      </h1>
                      <p className="text-sm text-[#FF7F3E]">
                        {work.work_deadline}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end items-end">
                    <div className="flex flex-col text-sm">
                      <h1
                        className="text-secondary"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        เริ่มต้น
                      </h1>
                      <p className="text-primary">{work.work_budget}$</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Arrow */}
    <button
      className="absolute right-0 z-10 p-2 rounded-full"
      onClick={() => handleArrowClickBox2('rightbox2')}
    >
      <Image
        src="/Frame 272.png"
        width={40}
        height={40}
        alt="Right arrow icon"
      />
    </button>
  </div>
</div>


      {/* BOX 3 */}
      <div className="flex flex-col p-10 text-3xl gap-4">
        <h1>งานที่คุณอาจจะกำลังตามหา</h1>
        <div className="flex gap-1 justify-between">
          <div className="flex flex-col justify-center">
            <Image
              src="/Frame 271.png"
              width={40}
              height={40}
              className="h-15 w-15 cursor-pointer"
              alt="Left arrow icon"
            />
          </div>
          <div className="flex gap-4 w-full overflow-x-auto mx-16">
            <div className="flex flex-col border border-black rounded-t-xl">
              <Image
                src="/Rectangle 879.png"
                width={590}
                height={590}
                className="rounded-t-xl flex-1"
                alt="Sample work from a freelancer"
              />
              <div className="text-secondary flex-none px-3 bg-white">
                <h1 className="text-xl px-1">ชื่อ</h1>
                <h1 className="text-sm px-5">หมวดหมู่</h1>
                <div className="flex">
                  <div className="flex gap-20">
                    <div className="flex p-1 gap-3">
                      <Image
                        src="/Rectangle 879.png"
                        width={45}
                        height={45}
                        className="rounded-full"
                        alt="Freelancer profile picture"
                      />
                      <div>
                        <h1 className="text-xl text-primary line-clamp-1">
                          nickykung123
                        </h1>
                        <p className="text-sm text-[#FF7F3E]">วันที่ครบกำหนด</p>
                      </div>
                    </div>
                    <div className="flex justify-end items-end">
                      <div className="flex flex-col text-sm">
                        <h1
                          className="text-secondary"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          เริ่มต้น
                        </h1>
                        <p className="text-primary">3,000$</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src="/Frame 272.png"
              width={40}
              height={40}
              className="h-15 w-15 cursor-pointer"
              alt="Right arrow icon"
            />
          </div>
        </div>
      </div>

      {/* BOX 4 */}
      <div className="flex flex-col p-10 text-3xl gap-4">
        <h1>ผลงานที่โดดเด่นจาก Freelance</h1>
        <div className="flex gap-3 justify-between">
          <div className="flex flex-col justify-center">
            <Image
              src="/Frame 271.png"
              width={40}
              height={40}
              className="h-10 w-10"
              alt="Left arrow icon"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col rounded-t-xl w-[80]">
              <Image
                src="/Rectangle 879.png"
                width={700}
                height={400}
                className="rounded-xl"
                alt="Highlighted freelancer work"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src="/Frame 272.png"
              width={40}
              height={40}
              className="h-10 w-10"
              alt="Right arrow icon"
            />
          </div>
        </div>
      </div>

      {/* BOX 5 */}
      <div className="flex justify-center">
        <div className="rounded-full bg-[#D9D9D9] w-[600px] flex justify-center p-5">
          <div className="flex justify-center gap-5">
            <button
              className={`btn rounded-full text-center ${
                sortOrder === "standard"
                  ? "bg-[#050C9C] text-white"
                  : "bg-[#D9D9D9] text-[#050C9C]"
              } text-4xl`}
              onClick={() => handleSortChange("standard")}
            >
              มาตรฐาน
            </button>
            <button
              className={`btn rounded-full text-center ${
                sortOrder === "oldest"
                  ? "bg-[#050C9C] text-white"
                  : "bg-[#D9D9D9] text-[#050C9C]"
              } text-4xl`}
              onClick={() => handleSortChange("oldest")}
            >
              เก่าที่สุด
            </button>
            <button
              className={`btn rounded-full text-center ${
                sortOrder === "newest"
                  ? "bg-[#050C9C] text-white"
                  : "bg-[#D9D9D9] text-[#050C9C]"
              } text-4xl`}
              onClick={() => handleSortChange("newest")}
            >
              ใหม่ที่สุด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
