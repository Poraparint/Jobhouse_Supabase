"use client";
import { useState } from "react";
import Card from "./Card";
import Search from "./Search";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  return (
    <div className="Page w-full flex flex-col items-center">
      <div className="w-[90%] border bg-bg border-light shadow-2xl p-7 rounded-xl tracking-wider">
        {/* ใช้คอมโพเนนต์ Search */}
        <Search
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          deadline={deadline}
          setDeadline={setDeadline}
        />

        <Card
          search={search}
          category={category}
          deadline={deadline}
        />
      </div>
    </div>
  );
}


