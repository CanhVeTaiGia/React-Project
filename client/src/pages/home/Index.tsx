import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { RootType, UserType } from "../../interface/interface";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/user.service";
import { Footer } from "../../components/Footer/Footer";

const Index: React.FC = () => {
  const [userId, setUserId] = useState<number>(() => {
    const userId = localStorage.getItem("userId");
    return userId ? parseInt(userId) : 0;
  });

  const data: any = useSelector((state: RootType) => {
    return state.users;
  });

  const user = Array.isArray(data.users) ? null : data.users;

  const navigate = useNavigate();
  const dispath = useDispatch();

  const checkLogin = () => {
    if (!userId) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userId) {
      dispath(getUserById(userId));
    }
  }, []);

  return (
    <>
      <div className="w-[100%] bg-[#222] h-[100vh] overflow-scroll scrollbar">
        <Header currentUser={user} />
        <div className="w-[100%] bg-[#222] mb-[0px] h-[50px]"></div>
        <Outlet />
        <Footer></Footer>
      </div>
    </>
  );
};

export default Index;
