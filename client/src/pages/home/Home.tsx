import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  CourseType,
  ExamSubjectType,
  RootType,
} from "../../interface/interface";
import { useEffect, useState } from "react";
import { getAllExamSubject } from "../../services/examSubject.service";
import { getAllCourse } from "../../services/course.service";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { examSubjects }: any = useSelector((state: RootType) => {
    return state.examSubjects;
  });
  const { courses }: any = useSelector((state: RootType) => {
    return state.courses;
  });

  const examArr = examSubjects ? [...examSubjects] : [];

  const courseArr = courses ? [...courses] : [];

  const [currentExamIndex, setCurrentExamIndex] = useState<number>(6);

  const nextExamIndex = () => {
    // console.log(examArr.length);
    if (currentExamIndex < examArr.length) {
      setCurrentExamIndex(currentExamIndex + 1);
    } else {
      setCurrentExamIndex(6);
    }
  };
  const [userId, setUserId] = useState<number>(() => {
    const userId = localStorage.getItem("userId");
    return userId ? Number(JSON.parse(userId)) : 0;
  });
  const prevExamIndex = () => {
    if (currentExamIndex > 6) {
      setCurrentExamIndex(currentExamIndex - 1);
    } else {
      setCurrentExamIndex(examArr.length - 1);
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExamSubject());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  return (
    <>
      <div className="w-[100%] overflow-x-hidden overflow-hidden pb-[60px] pt-[40px] text-white px-[120px]">
        <div className="flex w-[100%]">
          <div className="ml-[40px] w-[100%] mt-[150px] flex flex-col gap-[20px] mr-[80px]">
            <h2 className="w-[100%] text-[40px] gap-[10px] flex justify-center">
              Tìm khóa học<p className="text-[#f00]"> phù hợp</p>
            </h2>
            <p className="text-[24px] text-center mt-[20px]">
              LỰA CHỌN KHÓA HỌC YÊU THÍCH, CÙNG NHAU HỌC TẬP
            </p>
            <div className="w-[100%] mt-[20px] relative">
              <input
                placeholder="Bạn muốn học gì hôm nay?"
                type="text"
                className="pl-[20px] hover:border-[#f00] placeholder:text-[#eee] outline-none w-[100%] bg-transparent border-[1px] rounded-[50px] h-[40px]"
              />
              <FontAwesomeIcon
                className="h-[20px] rounded-[50%] right-[5px] top-[6px] p-[5px] bg-[#f00] absolute"
                icon={faMagnifyingGlass}
              />
            </div>
          </div>
          <img
            className="w-[50%]"
            src="https://firebasestorage.googleapis.com/v0/b/project-react-48d03.appspot.com/o/background%2F%E2%80%94Pngtree%E2%80%94hand%20drawn%20cartoon%20reading%20exam_5355872.png?alt=media&token=eb8b98d9-6895-4992-9743-b692c83e76db"
          />
        </div>
        <div className="w-[100%] mt-[20px] h-[100%]">
          <h2 className="text-[20px] flex-wrap text-[#f00] mb-[30px]">
            Các khóa học
          </h2>
          <div className="w-[100%] px-[10px] pb-[30px] flex justify-between flex-wrap">
            {courseArr.map((item: CourseType) => (
              <div
                key={item.id}
                onClick={() => {
                  if (!userId) {
                    return navigate("/login");
                  }
                  navigate(`/subject/:${item.id}`);
                }}
                className="w-[600px] cursor-pointer rounded-l-[5px] bg-[#333] rounded-ee-[30px] group mb-[20px] flex"
              >
                <div className="w-[100px] rounded-l-[5px] h-[100px] group-hover:bg-[#ff5031] transition-all duration-300 bg-[#ff000055] text-[40px] flex justify-center items-center">
                  {item.title.charAt(31)}
                </div>
                <div className="w-[500px] group-hover:bg-[#444] transition-all duration-300 rounded-ee-[30px] py-[5px] pl-[10px]">
                  <h2 className="text-[16px] text-[#f80] mb-[5px]">
                    {item.title}
                  </h2>
                  <p className="text-[14px]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="text-[20px] text-[#f00]">Các môn học chính</h2>
          <div className="mt-[30px] transition-all w-[100%] duration-100 relative flex gap-[20px] text-[#6c9dff]">
            {examArr.map((item: ExamSubjectType) => (
              <div
                onClick={() => {
                  if (!userId) {
                    return navigate("/login");
                  }
                  navigate(`/course/:${item.courseId}`, { state: item.id });
                }}
                key={item.id}
                className="w-[180px] rounded-[10px] h-[180px] bg-[#ff000055] flex justify-center items-center hover:bg-[#ff5031] hover:mb-[10px] hover:mt-[-10px] hover:text-white cursor-pointer hover:opacity-[1]"
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
