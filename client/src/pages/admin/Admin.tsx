import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../../components/Navbar/Navbar";
import { useState } from "react";

const Admin: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(() => {
    const userId = localStorage.getItem("userId");
    if (userId) return JSON.parse(userId);
  });
  return (
    <>
      <div className="w-[100%] bg-[#eee] flex">
        <AdminNavbar id={1}></AdminNavbar>
        <div className="w-[100%] clear-start h-[100px] p-[20px]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
export default Admin;
