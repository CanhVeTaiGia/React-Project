import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCircleQuestion,
  faCircleUser,
  faFile,
  faHouse,
  faList,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { UserType } from "../interface/interface";
import { baseUrl } from "../baseAPI/baseURL";

interface Props {
  id: number;
}
export const AdminNavbar: React.FC<Props> = ({ id }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await baseUrl.get(`users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    getUser();
  }, [id]);
  return (
    <>
      <div className="w-[200px] bg-black h-[100vh] p-[10px] text-white flex flex-col justify-between">
        <div>
          <div className="flex flex-col justify-center items-center pt-[30px]">
            {user && user.image ? (
              <img className="w-[40px]" src={user.image} />
            ) : (
              <FontAwesomeIcon className="text-[40px]" icon={faCircleUser} />
            )}
            <p className="mt-[10px]">
              Chào: {user ? ` ${user?.firstName} ${user?.lastName}` : "admin"}
            </p>
          </div>
          <div className="p-[10px] pl-[20px] mt-[50px] mb-[30px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]">
            <FontAwesomeIcon icon={faHouse} />
            <p>Trang chủ</p>
          </div>
          <div className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]">
            <FontAwesomeIcon icon={faUser} />
            <p>Người dùng</p>
          </div>
          <div className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]">
            <FontAwesomeIcon icon={faList} />
            <p>Khóa học</p>
          </div>
          <div className="p-[10px] pl-[20px] mb-[20px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]">
            <FontAwesomeIcon icon={faList} />
            <p>Khóa học</p>
          </div>
        </div>
            
        <div className="p-[10px] pl-[20px] mb-[10px] flex gap-[20px] items-center cursor-pointer rounded-[5px] hover:bg-[#222]">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p>Đăng xuất</p>
        </div>
      </div>
    </>
  );
};

export const Navbar: React.FC = () => {
  return <></>;
};
