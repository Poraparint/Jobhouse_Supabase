export default function Home() {
  return (
    <div className="w-full items-center flex flex-col">
      <input
        className="border border-[#919191] py-3 px-4 w-[60%] rounded-xl mt-16 text-xl"
        type="text"
        placeholder="ค้นหาฟรีแลนซ์"
      />
      <div className=" bg-white mt-9 flex justify-around border-b-2 border-[#E4E4E4] w-[100%] gap-2">
        <button className="Filterd_Job">ออกแบบกราฟฟิก</button>
        <button className="Filterd_Job">สถาปัตย์และวิศวกรรม</button>
        <button className="Filterd_Job">เว็บไซต์และเทคโนโลยี</button>
        <button className="Filterd_Job">การตลาดและโฆษณา</button>
        <button className="Filterd_Job">ภาพและรูปถ่าย</button>
        <button className="Filterd_Job">บทความ</button>
        <button className="Filterd_Job">PP นำเสนอ</button>
        <button className="Filterd_Job">วางแพลนเที่ยว</button>
      </div>
    </div>
  );
}
