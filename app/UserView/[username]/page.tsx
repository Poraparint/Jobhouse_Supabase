import UserView from "@/components/UserView";

export default function UserViewPage({ params }) {
  const { username } = params; // รับค่า username จาก params
  return <UserView username={username} />; // ส่ง username ให้กับ UserView
}
