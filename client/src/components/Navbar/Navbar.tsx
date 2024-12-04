import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRotateLeft,
  faBookOpen,
  faCircleQuestion,
  faCircleUser,
  faClockRotateLeft,
  faFile,
  faHome,
  faHouse,
  faList,
  faRightFromBracket,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { RootType, UserType } from "../../interface/interface";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUserById } from "../../services/user.service";

interface Props {
  id: number;
}
export const AdminNavbar: React.FC<Props> = ({ id }) => {
  const data: any = useSelector((state: RootType) => {
    return state.users;
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  const adminUser = data.adminProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminUserById(id));
  }, []);
  return (
    <>
      <div className="w-[200px] bg-black h-[100vh] p-[10px] text-white flex flex-col justify-between">
        <div>
          <div className="flex flex-col justify-center items-center pt-[30px]">
            {adminUser && adminUser.image ? (
              <img
                className="w-[40px] h-[40px] rounded-[50%]"
                src={adminUser.image}
              />
            ) : (
              <FontAwesomeIcon className="text-[40px]" icon={faCircleUser} />
            )}
            <p className="mt-[10px] text-[12px]">
              Chào {adminUser.name ? ` ${adminUser.name}` : "admin"}
            </p>
          </div>
          <div
            onClick={() => navigate("/admin")}
            className="p-[10px] pl-[20px] mt-[50px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]"
          >
            <FontAwesomeIcon icon={faHouse} />
            <p>Trang chủ</p>
          </div>
          <div
            onClick={() => navigate("usermanager")}
            className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]"
          >
            <FontAwesomeIcon icon={faUser} />
            <p>Người dùng</p>
          </div>

          <div
            onClick={() => navigate("coursemanager")}
            className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]"
          >
            <FontAwesomeIcon icon={faList} />
            <p>Khóa thi</p>
          </div>
          <div
            onClick={() => navigate("examSubject")}
            className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]"
          >
            <FontAwesomeIcon icon={faBookOpen} />
            <p>Môn thi</p>
          </div>
          <div
            onClick={() => navigate("exam")}
            className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]"
          >
            <FontAwesomeIcon icon={faFile} />
            <p>Đề thi</p>
          </div>

          <div
            onClick={() => navigate("quest")}
            className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]"
          >
            <FontAwesomeIcon icon={faCircleQuestion} />
            <p>Câu hỏi</p>
          </div>
          <div className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]">
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <p>Lịch sử</p>
          </div>
        </div>

        <div
          onClick={handleLogout}
          className="p-[10px] pl-[20px] mb-[10px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p>Đăng xuất</p>
        </div>
      </div>
    </>
  );
};

interface NavbarProps {
  currentUser: UserType;
}
export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);
  
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[100%] flex items-center gap-[30px]">
        <div
          onClick={() => {
            if (!currentUser) {
              return navigate("/login");
            }
            navigate("/");
          }}
          className="flex cursor-pointer hover:text-[#f00] gap-[10px] items-cennter"
        >
          <FontAwesomeIcon className="text-[16px]" icon={faHome} />
          <p className="text-[16px]">Trang chủ</p>
        </div>
        <div
          onClick={() => {
            if (!currentUser) {
              return navigate("/login");
            }
            navigate("course/:0");
          }}
          className="flex hover:text-[#f00] cursor-pointer gap-[10px] items-center"
        >
          <FontAwesomeIcon className="text-[16px]" icon={faList} />
          <p className="text-[16px]">Khóa thi</p>
        </div>
      </div>
    </>
  );
};

export const ProfileNavbar = () => {
  const [userId, setUserId] = useState<number>(() => {
    const token = localStorage.getItem("userId");
    return token ? Number(JSON.parse(token)) : 0;
  });

  const { users }: any = useSelector((state: RootType) => {
    return state.users;
  });

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const user: UserType | null = Array.isArray(users) ? null : users;

  const navigate = useNavigate();
  return (
    <div className="w-[240px] text-[#f00] py-[30px] text-[18px] pl-[20px] border-r-[1px] border-[#444]">
      <ul>
        <li
          onClick={() => navigate("/user/profile")}
          className="flex items-center gap-[10px] py-[5px] mb-[30px] cursor-pointer rounded-t-[3px] pl-[10px]"
        >
          <FontAwesomeIcon icon={faUser} />
          Tài khoản
        </li>
        <li
          onClick={() => navigate("/user/history")}
          className="gap-[10px] flex items-center py-[5px] mb-[30px] cursor-pointer rounded-b-[3px] pl-[10px]"
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
          Lịch sử bài thi
        </li>
        {user?.role === "ADMIN" ? (
          <li
            onClick={() => navigate("/admin")}
            className="gap-[10px] flex items-center py-[5px] mb-[30px] cursor-pointer rounded-b-[3px] pl-[10px]"
          >
            <FontAwesomeIcon icon={faUserShield} />
            Trang quản trị
          </li>
        ) : null}
        <li
          onClick={handleLogOut}
          className="gap-[10px] flex items-center py-[5px] cursor-pointer rounded-b-[3px] pl-[10px]"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Đăng xuất
        </li>
      </ul>
    </div>
  );
};
