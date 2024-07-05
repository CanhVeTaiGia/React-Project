import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserManagerHeader: React.FC = () => {
  return (
    <>
      <div className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex">
        <h2 className="text-[24px] font-[600]">Quản lý người dùng</h2>

        <div className="w-[300px] h-[100%] flex items-center">
          <select className="w-[120px] rounded-[5px] border-[1px]" >
            <option hidden value="">Sắp xếp</option>
            <option value="">Theo tên</option>
            <option value="">Theo</option>
          </select>
        </div>

        <div className="relative w-[300px] h-[60px] flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-[100%] pl-[30px] h-[60%] border-[1px] rounded-[5px]"
          />
          <FontAwesomeIcon className="absolute text-[13px] top-[25px] outline-none text-[#aaa] left-[10px]" icon={faMagnifyingGlass} />
        </div>
      </div>
    </>
  );
};

export const Header: React.FC = () => {
  return (
    <>
      <div className="w-[100%] py-[5px] px-[150px] bg-[#222]">
        <div className="w-[70%] h-[100%] flex items-center text-white">
          <h1 className=" text-[32px] mr-[10px]">ThiOnline</h1>
          <FontAwesomeIcon icon={faList} />
          <p className="mr-[10px]">Khóa Học</p>
        </div>
      </div>
    </>
  );
};
