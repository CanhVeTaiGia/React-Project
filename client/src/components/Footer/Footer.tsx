import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  handlePageChange: (currentPage: number) => void;
  currentPage: number;
  totalPages: number;
}
export const UserManagerFooter: React.FC<Props> = ({
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <>
      <footer className="justify-center bottom-[30px] h-[300px] w-[100%]">
        <h2 className="w-[100%] mb-[10px] text-center">
          Trang {currentPage} / {totalPages}
        </h2>
        <div className="w-[100%] flex justify-center items-center">
          <div className="'h-[40px] flex items-center">
            <FontAwesomeIcon
              className="w-[20px] cursor-pointer p-[10px] rounded-l-[3px] text-[20px] border-[1px] border-[#bbb]"
              icon={faChevronLeft}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className='cursor-pointer w-[40px] h-[40px] text-[20px] border-y-[1px] border-[#bbb]'
              >
                {index + 1}
              </button>
            ))}
            <FontAwesomeIcon
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-[20px] cursor-pointer p-[10px] rounded-r-[3px] text-[20px] border-[1px] border-[#bbb]"
              icon={faChevronRight}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="w-[100%] bg-[#222] border-t-[1px] rounded-t-[5px] border-[#555] p-[20px] px-[120px] mt-[20px]">
      
    </footer>
  )
}
