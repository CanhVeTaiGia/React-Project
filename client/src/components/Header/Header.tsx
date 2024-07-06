import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props{
  showModal: boolean,
  changeModal: () => void,
  typeShowModal: "ADD"
}
export const UserManagerHeader: React.FC<Props> = ({showModal, typeShowModal, changeModal}) => {
  return (
    <>
      <div className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] px-[20px] p-[10px] items-center justify-between flex">
        <div className="w-[300px] h-[100%] flex items-center">
          <select className="w-[140px] rounded-[5px] border-[1px]" >
            <option hidden value="">Hiển thị bản ghi</option>
            <option value="">Theo tên</option>
            <option value="">Theo </option>
          </select>
        </div>

        <div className="relative w-[300px] h-[60px] flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-[100%] outline-none pl-[30px] h-[60%] border-[1px] rounded-[5px]"
          />
          <FontAwesomeIcon className="absolute text-[13px] top-[25px] outline-none text-[#aaa] left-[10px]" icon={faMagnifyingGlass} />
        </div>

        <button onClick={changeModal} className="h-[50%] rounded-[3px] p-[10px] text-white bg-[#08f]">
          Thêm người dùng
        </button>
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
