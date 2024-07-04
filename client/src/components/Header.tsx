import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const AdminHeader: React.FC = () => {
  return (
    <>
      <div className="w-[100%] h-[100px] bg-[#fff] rounded-[5px] p-[10px] items-center justify-end flex">
        <FontAwesomeIcon className="w-[120px] cursor-pointer text-[56px]" icon={faCircleUser}/>
      </div>
    </>
  );
};

export const Header: React.FC = () => {
  return <>
  <div className="w-[100%] py-[5px] px-[150px] bg-[#222]">
    <div className="w-[70%] h-[100%] flex items-center text-white">
      <h1 className=" text-[32px] mr-[10px]">ThiOnline</h1>
      <FontAwesomeIcon icon={faList} />
      <p className="mr-[10px]">Khóa Học</p>
    </div>
  </div>
  </>;
};
