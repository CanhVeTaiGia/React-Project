import { Outlet } from "react-router-dom";
import { ProfileNavbar } from "../../components/Navbar/Navbar";

const UserProfile: React.FC = () => {
  return <div className="w-[100%] flex h-[90%]">
    <ProfileNavbar/>
    <Outlet/>
  </div>;
};
export default UserProfile;
