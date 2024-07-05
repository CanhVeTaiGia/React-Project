import { useLocation } from "react-router-dom";
import { AdminNavbar } from "../components/Navbar";

const Admin: React.FC = () => {
  
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
