"use client"
import {useState, useEffect} from 'react'
import { createClient } from "@/utils/supabase/client";

function page() {

    const [data, setData] = useState<any>([]);

    const fetch = async () => {  
        const supabase = createClient();
        const { data: notes } = await supabase.from("notes").select();
        setData(notes);
    }
    

    useEffect(() => { fetch() }, [])
    
  return (
      <>
          {data.map((index, note) => (
              <div key={note}>{ index.title }</div>
          ))}
     </>
  )
}

export default page