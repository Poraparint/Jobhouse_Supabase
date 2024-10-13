// "use sever"

// import { cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/server'

// export async function UserInfo(formData: FormData) {

//   const Cus_name = formData.get('Cus_name')
//   const Tel = formData.get('Tel')

//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   const { data, error } = await supabase
//     .from('Customer')
//     .insert([{
//       Cus_name,
//       Tel,
//     }])
//   if (error) {
//     console.log('found some error', error);
//     return false;
//   }
//   console.log('Register successful');
// }
