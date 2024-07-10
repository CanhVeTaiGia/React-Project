import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCircleQuestion,
  faCircleUser,
  faClockRotateLeft,
  faFile,
  faHouse,
  faList,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { RootType } from "../../interface/interface";
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

  // console.log(adminUser);

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
              <img className="w-[40px]" src={data.users.image} />
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
            onClick={() => navigate("coursemanager")}
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

export const Navbar: React.FC = () => {
  return <></>;
};
