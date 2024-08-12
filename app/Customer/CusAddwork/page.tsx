import { addWork } from "./Addwork";

function CusAddwork() {
  return (
    <div className="Page bg-white border border-secondary shadow-xl rounded-md w-[90%] p-10">
      <form className="w-full flex flex-col gap-5">
        <h1 className="text-primary font-semibold text-3xl">บอร์ดประกาศงาน</h1>
        <h1 className="ml-5 text-secondary text-xl">ชื่องาน</h1>
        <input
          name="work_name"
          type="text"
          className="w-full border border-secondary rounded-md p-1 text-lg"
          required
        />
        <h1 className="ml-5 text-secondary text-xl">รายละเอียด</h1>
        <input
          name="work_detail"
          className="h-[10rem] w-full border border-secondary rounded-md p-1 text-lg"
          required
        ></input>
        <div className="flex justify-between gap-9">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">
              ตัวอย่างผลงานที่ต้องการ
            </h1>
            <input
              name="work_ex"
              type="text"
              className="w-full border border-secondary rounded-md p-1 text-lg"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">งบประมาณ</h1>
            <input
              name="work_budget"
              type="text"
              className="w-full border border-secondary rounded-md p-1 text-lg"
              required
            />
          </div>
        </div>
        <div className="flex justify-between gap-9">
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">หมวดหมู่งาน</h1>
            <input
              name="work_catagory"
              type="text"
              className="w-full border border-secondary rounded-md p-1 text-lg"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="ml-5 text-secondary text-xl">กำหนดส่งงาน</h1>
            <input
              name="work_deadline"
              type="date"
              className="w-full border border-secondary rounded-md p-1 text-lg"
              required
            />
          </div>
        </div>
        <div className="flex justify-end text-xl gap-5 mt-14">
          <button className="border border-secondary text-secondary p-2 rounded-md">
            ย้อนกลับ
          </button>
          <button
            type="submit"
            formAction={addWork}
            className="border border-primary bg-primary text-white py-2 px-4 rounded-md"
          >
            ส่งงาน
          </button>
        </div>
      </form>
    </div>
  );
}

export default CusAddwork;
