import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // เพิ่มการจัดการ loading
  const [error, setError] = useState(null); // เพิ่มการจัดการ error
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true); // เริ่มโหลดข้อมูล
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        setUser(data.user); // บันทึกข้อมูลผู้ใช้
      } catch (err) {
        setError(err); // จัดการข้อผิดพลาด
      } finally {
        setIsLoading(false); // เสร็จสิ้นการโหลด
      }
    };

    fetchUser();
  }, [supabase]);

  return { user, isLoading, error };
};
