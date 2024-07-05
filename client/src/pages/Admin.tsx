import { useLocation } from "react-router-dom";
import { AdminNavbar } from "../components/Navbar";
import { useState } from "react";

const Admin: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(() => {
    const userId = localStorage.getItem("userId");
    if (userId) return parseInt(userId);
  });
  return (
    <>
      <div className="w-[100%] bg-[#eee] flex">
        <AdminNavbar
          id={1}
        ></AdminNavbar>
        <div className="w-[100%] h-[100px] p-[20px]"></div>
      </div>
    </>
  );
};
export default Admin;
