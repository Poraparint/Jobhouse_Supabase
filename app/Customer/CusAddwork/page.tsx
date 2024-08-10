import React from 'react'

function CusAddwork() {
  return (
    <div className="Page bg-white border border-secondary shadow-xl rounded-md w-[90%] p-10">
      <form action="" className="w-full flex flex-col gap-5">
        <h1 className="text-primary font-semibold text-3xl">บอร์ประกาศงาน</h1>
        <h1 className="ml-5 text-secondary text-xl">ชื่องาน</h1>
        <input
          type="text"
          className="w-full border border-secondary rounded-md p-1 text-lg"
        />
        <h1 className="ml-5 text-secondary text-xl">รายละเอียด</h1>
        <textarea
          name=""
          id=""
          className="h-[10rem] w-full border border-secondary rounded-md p-1 text-lg"
        ></textarea>
        <div className="flex justify-between gap-9">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">
              ตัวอย่างผลงานที่ต้องการ
            </h1>
            <input
              type="text"
              className="w-full border border-secondary rounded-md p-1 text-lg"
            />
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">งบประมาณ</h1>
            <input
              type="text"
              className="w-full border border-secondary rounded-md p-1 text-lg"
            />
          </div>
        </div>
        <div className="flex justify-between gap-9">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">หมวดหมู่งาน</h1>
            <input
              type="text"
              className="w-full border border-secondary rounded-md p-1 text-lg"
            />
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">กำหนดส่งงาน</h1>
            <input
              type="text"
              className="w-full border border-secondary rounded-md p-1 text-lg"
            />
          </div>
        </div>
        <div className="flex justify-end text-xl gap-5 mt-14">
          <button className="border border-secondary text-secondary p-2 rounded-md">
            ย้อนกลับ
          </button>
          <button className="border border-primary bg-primary text-white py-2 px-4 rounded-md">
            ส่งงาน
          </button>
        </div>
      </form>
    </div>
  );
}

export default CusAddwork