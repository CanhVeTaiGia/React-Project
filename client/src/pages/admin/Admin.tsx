import { Outlet, useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";

const Admin: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(() => {
    const userId = localStorage.getItem("userId");
    if (userId) return JSON.parse(userId);
  });

  const navgate = useNavigate();
  
  useEffect(() => {
    if(!currentUserId){
      navgate('/login')
    }
    
  })
  return (
    <>
      <div className="w-[100%] bg-[#eee] flex">
        <AdminNavbar id={currentUserId || 0}></AdminNavbar>
        <div className="w-[100%] clear-start h-[100px] p-[20px]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
export default Admin;
