import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { RootType } from "../../interface/interface";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/user.service";
import { Footer } from "../../components/Footer/Footer";

const Index: React.FC = () => {
  const [userId, setUserId] = useState<number>(() => {
    const userId = localStorage.getItem("userId");
    return userId ? parseInt(userId) : 0;
  });

  const { users }: any = useSelector((state: RootType) => {
    return state.users;
  });

  const navigate = useNavigate();
  const dispath = useDispatch();

  useEffect(() => {
    if (userId) {
      dispath(getUserById(userId));
    }
  }, []);

  // console.log(users);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="w-[100%] bg-[#222] h-[100vh] overflow-auto">
        <Header currentUser={users} />
        <div className="w-[100%] bg-[#222] mb-[20px] h-[100px]"></div>
        <Outlet />
        <Footer></Footer>
      </div>
    </>
  );
};

export default Index;
