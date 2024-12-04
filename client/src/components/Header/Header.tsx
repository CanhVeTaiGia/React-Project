import {
  faArrowRightFromBracket,
  faArrowRotateLeft,
  faCircleUser,
  faMagnifyingGlass,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExamType, QuestType, UserType } from "../../interface/interface";
import { Navbar } from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";

interface Props {
  changeSearchQuerty: (searchQuery: string) => void;
  showModal: boolean;
  changeModal: () => void;
  typeSort: (type: "asc" | "desc") => void;
  typeShowModal: "ADD";
}
export const UserManagerHeader: React.FC<Props> = ({
  changeSearchQuerty,
  typeSort,
  changeModal,
}) => {
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    typeSort(e.target.value as "asc" | "desc");
  };
  return (
    <>
      <div className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex">
        <div className="w-[300px] h-[100%] flex items-center">
          <select
            onChange={handleSort}
            className="w-[140px] rounded-[5px] border-[1px] outline-none cursor-pointer"
          >
            <option value="desc">Tăng dần</option>
            <option value="asc">Giảm dần</option>
          </select>
        </div>

        <div className="relative w-[300px] h-[60px] flex items-center">
          <input
            onChange={(e) => changeSearchQuerty(e.target.value)}
            type="text"
            placeholder="Tìm kiếm"
            className="w-[100%] outline-none pl-[30px] h-[60%] border-[1px] rounded-[5px]"
          />
          <FontAwesomeIcon
            className="absolute text-[13px] top-[25px] outline-none text-[#aaa] left-[10px]"
            icon={faMagnifyingGlass}
          />
        </div>

        <button
          onClick={changeModal}
          className="h-[50%] rounded-[3px] p-[10px] text-white bg-[#08f]"
        >
          Thêm Người Dùng
        </button>
      </div>
    </>
  );
};

interface HeaderProps {
  currentUser: UserType;
}
export const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [menuUser, setMenuUser] = useState<boolean>(false);

  const handleShowUserMenu = () => {
    if (currentUser) {
      setMenuUser(!menuUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleToUser = () => {
    setMenuUser(!menuUser);
    if (currentUser) {
      navigate(`/user/profile`);
    } else {
      navigate("/login");
    }
  };

  const handleToHistory = () => {
    setMenuUser(!menuUser);
    if (currentUser) {
      navigate(`/user/history`);
    } else {
      navigate("/login");
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <header className="w-[100%] z-[9999] bg-[#222] p-[5px] pl-[200px] fixed top-0 left-0 border-b-[1px] rounded-b-[5px] border-[#555]">
        <div className="w-[100%] h-[100%] flex justify-between">
          <div className="mr-[20px] flex text-white items-end">
            <div className="mr-[150px]">
              <img
                className="w-[40px] rounded-[5px]"
                src="https://firebasestorage.googleapis.com/v0/b/project-react-48d03.appspot.com/o/logo%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(1).png?alt=media&token=623bb024-b588-4cb4-817a-22aa5185ffcb"
              />
            </div>
            <Navbar currentUser={currentUser}></Navbar>
          </div>
          <div className="w-[30%] cursor-pointer relative text-white flex items-center">
            {currentUser ? (
              currentUser && currentUser.image ? (
                <>
                  <img
                    onClick={handleShowUserMenu}
                    className="h-[24px] w-[24px] rounded-[50%] mr-[10px]"
                    src={currentUser.image}
                  />
                  <p>{currentUser.name}</p>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    onClick={handleShowUserMenu}
                    className="text-white h-[24px] mr-[10px]"
                    icon={faCircleUser}
                  />
                  <p onClick={handleShowUserMenu}>{currentUser.name}</p>
                </>
              )
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="w-[100px] mr-[10px] h-[30px] bg-[#f00] rounded-[3px]"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-[100px] h-[30px] bg-[#f00] rounded-[3px]"
                >
                  Đăng kí
                </button>
              </>
            )}
            {menuUser && (
              <div className="absolute top-[50px] text-white rounded-[3px] text-[14px] shadow-lg bg-[#222] w-[210px]">
                <ul>
                  <li
                    onClick={handleToUser}
                    className="hover:bg-[#333] flex items-center gap-[10px] py-[5px] mb-[10px] cursor-pointer rounded-t-[3px] pl-[10px]"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    Tài khoản
                  </li>
                  <li
                    onClick={() => navigate("/user/history")}
                    className="hover:bg-[#333] gap-[10px] flex items-center py-[5px] mb-[10px] cursor-pointer rounded-b-[3px] pl-[10px]"
                  >
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                    Lịch sử bài thi
                  </li>
                  {currentUser && currentUser.role === "ADMIN" ? (
                    <li
                      onClick={() => navigate("/admin")}
                      className="hover:bg-[#333] gap-[10px]  mb-[10px] flex items-center py-[5px] cursor-pointer rounded-b-[3px] pl-[10px]"
                    >
                      <FontAwesomeIcon icon={faUserShield} />
                      Trang quản trị
                    </li>
                  ) : (
                    ""
                  )}
                  <li
                    onClick={handleLogout}
                    className="hover:bg-[#333] gap-[10px] flex items-center py-[5px] cursor-pointer rounded-b-[3px] pl-[10px]"
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

interface CourseHeaderProps {
  setCourseToEditOrAdd: (id: number) => void;
}
export const CourseHeader: React.FC<CourseHeaderProps> = ({
  setCourseToEditOrAdd,
}) => {
  return (
    <>
      <header className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex">
        <div className="w-[300px] h-[100%] flex items-center">
          <select className="w-[140px] rounded-[5px] border-[1px] outline-none cursor-pointer">
            <option className="cursor-pointer bg-white" hidden value="">
              Sắp xếp
            </option>
            <option value="">Không sắp xếp</option>
            <option value="">Tăng dần</option>
            <option value="">Giảm dần</option>
          </select>
        </div>

        <div className="relative w-[300px] h-[60px] flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-[100%] outline-none pl-[30px] h-[60%] border-[1px] rounded-[5px]"
          />
          <FontAwesomeIcon
            className="absolute text-[13px] top-[25px] outline-none text-[#aaa] left-[10px]"
            icon={faMagnifyingGlass}
          />
        </div>

        <button
          onClick={() => setCourseToEditOrAdd(0)}
          className="h-[50%] rounded-[3px] p-[10px] text-white bg-[#08f]"
        >
          Thêm Khóa Thi
        </button>
      </header>
    </>
  );
};

interface ExamSubjectHeaderProps {
  setAddOrEdit: (id: number) => void;
}
export const ExamSubjectHeader: React.FC<ExamSubjectHeaderProps> = ({
  setAddOrEdit,
}) => {
  return (
    <>
      <header className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex shadow-md">
        <div className="w-[300px] h-[100%] flex items-center">
          <select className="w-[140px] rounded-[5px] border-[1px] outline-none cursor-pointer">
            <option className="cursor-pointer bg-white" hidden value="">
              Sắp xếp
            </option>
            <option value="">Không sắp xếp</option>
            <option value="">Tăng dần</option>
            <option value="">Giảm dần</option>
          </select>
        </div>

        <div className="relative w-[300px] h-[60px] flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-[100%] outline-none pl-[30px] h-[60%] border-[1px] rounded-[5px]"
          />
          <FontAwesomeIcon
            className="absolute text-[13px] top-[25px] outline-none text-[#aaa] left-[10px]"
            icon={faMagnifyingGlass}
          />
        </div>

        <button
          onClick={() => setAddOrEdit(0)}
          className="h-[50%] rounded-[3px] p-[10px] text-white bg-[#08f]"
        >
          Thêm Môn Thi
        </button>
      </header>
    </>
  );
};

interface ExamHeaderType {
  showModal: (exam: ExamType | null) => void;
}
export const ExamHeader: React.FC<ExamHeaderType> = ({ showModal }) => {
  return (
    <>
      <header className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex shadow-md">
        <div className="w-[300px] h-[100%] flex items-center">
          <select className="w-[140px] rounded-[5px] border-[1px] outline-none cursor-pointer">
            <option className="cursor-pointer bg-white" hidden value="">
              Sắp xếp
            </option>
            <option value="">Không sắp xếp</option>
            <option value="">Tăng dần</option>
            <option value="">Giảm dần</option>
          </select>
        </div>

        <div className="relative w-[300px] h-[60px] flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-[100%] outline-none pl-[30px] h-[60%] border-[1px] rounded-[5px]"
          />
          <FontAwesomeIcon
            className="absolute text-[13px] top-[25px] outline-none text-[#aaa] left-[10px]"
            icon={faMagnifyingGlass}
          />
        </div>

        <button
          onClick={() => showModal(null)}
          className="h-[50%] rounded-[3px] p-[10px] text-white bg-[#08f]"
        >
          Thêm Đề Thi
        </button>
      </header>
    </>
  );
};

interface QuestHeaderProps {
  showAddAndEditModal: (quest: QuestType | null) => void;
}
export const QuestHeader: React.FC<QuestHeaderProps> = ({
  showAddAndEditModal,
}) => {
  return (
    <>
      <header className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex shadow-md">
        <div className="w-[300px] h-[100%] flex items-center">
          <select className="w-[140px] rounded-[5px] border-[1px] outline-none cursor-pointer">
            <option className="cursor-pointer bg-white" hidden value="">
              Sắp xếp
            </option>
            <option value="">Không sắp xếp</option>
            <option value="">Tăng dần</option>
            <option value="">Giảm dần</option>
          </select>
        </div>

        <div className="relative w-[300px] h-[60px] flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-[100%] outline-none pl-[30px] h-[60%] border-[1px] rounded-[5px]"
          />
          <FontAwesomeIcon
            className="absolute text-[13px] top-[25px] outline-none text-[#aaa] left-[10px]"
            icon={faMagnifyingGlass}
          />
        </div>

        <button
          onClick={() => showAddAndEditModal(null)}
          className="h-[50%] rounded-[3px] p-[10px] text-white bg-[#08f]"
        >
          Thêm Câu Hỏi
        </button>
      </header>
    </>
  );
};
