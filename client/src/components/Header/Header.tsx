import {
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExamType, QuestType, UserType } from "../../interface/interface";
import { Navbar } from "../Navbar/Navbar";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { useNavigate } from "react-router-dom";

interface Props {
  showModal: boolean;
  changeModal: () => void;
  typeShowModal: "ADD";
}
export const UserManagerHeader: React.FC<Props> = ({
  showModal,
  typeShowModal,
  changeModal,
}) => {
  return (
    <>
      <div className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex">
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
  const navigate = useNavigate();
  return (
    <>
      <header className="w-[100%] z-[9999] bg-[#222] p-[20px] px-[200px] fixed top-0 left-0 border-b-[1px] rounded-b-[5px] border-[#555] mb-[20px]">
        <div className="w-[100%] h-[100%] flex justify-between">
          <div className="mr-[20px] flex text-white items-end">
            <div className="mr-[150px]">
              <img
                className="w-[60px] rounded-[5px]"
                src="https://firebasestorage.googleapis.com/v0/b/project-react-48d03.appspot.com/o/logo%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(1).png?alt=media&token=623bb024-b588-4cb4-817a-22aa5185ffcb"
              />
            </div>
            <Navbar></Navbar>
          </div>
          <div className="w-[30%] text-white flex items-center">
            {currentUser.role === "ADMIN" && currentUser ? (
              <button
                className="mr-[10px] w-[80px] rounded-[3px] border-white border-[1px] h-[24px]"
                onClick={() => navigate("/admin")}
              >
                Admin
              </button>
            ) : null}
            {currentUser.image && currentUser ? (
              <img
                className="h-[24px] w-[24px] mr-[20px]"
                src={currentUser.image}
              />
            ) : (
              <FontAwesomeIcon
                className="text-white h-[24px] mr-[20px]"
                icon={faCircleUser}
              />
            )}
            {currentUser ? <p>{currentUser.name}</p> : <button className="w-[120px] h-[40px] bg-[#f00]">Đăng nhập</button>}
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
