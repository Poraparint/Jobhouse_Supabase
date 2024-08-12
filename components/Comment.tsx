"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'

export default function Comment() {

    const [data, setData] = useState<any>([]);

    const fetch = async () => {
        const supabase = createClient();
        const { data: notes } = await supabase.from("notes").select();
        setData(notes);
    }

    useEffect(() => {
        fetch()
    }, [])

  return (
    <div className="mt-5 text-secondary flex flex-col gap-5 w-[50%] max-lg:w-full">
        <h1 className='ml-5 text-primary text-2xl font-medium'>รีวิวจากฟรีแลนซ์</h1>
        <hr className='border-2 border-primary rounded-full'/>  
        {data.map((note, index) => (
            <div className="border border-secondary bg-white p-3 rounded-lg shadow-xl" key={index}>
            <div className="flex gap-2 items-center">
                <Image
                src="/De_Profile.jpeg"
                alt="Profile"
                className="border ml-2 border-white rounded-full hover:border-secondary duration-300"
                width={40}
                height={40}
                />
                <h1 className='text-primary font-medium'>{note.name}</h1>
            </div>
            <hr className="border-[#D9D9D9] my-2" />
            <p className='m-2'>{note.title}</p>
            </div>
        ))}
    </div>
  );
}
