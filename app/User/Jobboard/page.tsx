"use client"
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import { table } from 'console';

function jobboard() {

  const [data, setData] = useState<any>([]);

  const fetch = async () => {
    const supabase = createClient();
    const { data: notes } = await supabase.from("notes").select();
    setData(notes);
  }

  useEffect(() => { fetch() }, [])

  return (
    <div className="Page">
      <div className="border bg-white">
        <table>
          <thead>
            <tr>
              <th className="border">id</th>
              <th className="border">title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((note, index) => (
              <tr key={index}>
                <td className="border">{note.id}</td>
                <td className="border">{note.title}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default jobboard