import { useSelector } from "react-redux";
import { ExamSubjectType, RootType } from "../../interface/interface";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";

const Subjects: React.FC = () => {
  const { examSubjects }: any = useSelector((state: RootType) => {
    return state.examSubjects;
  });

  const { id }: any = useParams();
  const navigate = useNavigate();

  const currentId = parseInt(id.split(":")[1]);

  const subjectArr = examSubjects ? [...examSubjects] : [];

  const filterdSubjects = subjectArr.filter((item) => {
    return item.courseId === currentId;
  });
  return (
    <>
      <div className="mt-[20px] px-[120px] mb-[20px]">
        <h2 className="text-[20px] text-[#f00]">Các môn học chính</h2>
        <div className="mt-[30px] transition-all w-[100%] duration-100 items-center relative flex flex-col gap-[20px] text-[#6c9dff]">
          {currentId
            ? filterdSubjects.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/exam/:${currentId}`)}
                  className="w-[800px] transition-all duration-300 cursor-pointer group flex h-[150px]"
                >
                  <div
                    key={item.id}
                    className="w-[150px] rounded-l-[10px] h-[100%] bg-[#ff000055] flex justify-center items-center group-hover:bg-[#ff5031] group-hover:mb-[10px] hroup-hover:mt-[-10px] group-hover:text-white hover:opacity-[1]"
                  >
                    {item.title}
                  </div>
                  <div className="w-[650px] group-hover:bg-[#333] rounded-r-[10px] text-white p-[10px] h-[100%] shadow-lg">
                    <h2 className="text-[20px]">{item.description}</h2>
                  </div>
                </div>
              ))
            : subjectArr.map((item: ExamSubjectType) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/exam/:${currentId}`)}
                  className="w-[800px] transition-all duration-300 cursor-pointer group flex h-[150px]"
                >
                  <div
                    key={item.id}
                    className="w-[150px] rounded-l-[10px] h-[100%] bg-[#ff000055] flex justify-center items-center group-hover:bg-[#ff5031] group-hover:mb-[10px] hroup-hover:mt-[-10px] group-hover:text-white hover:opacity-[1]"
                  >
                    {item.title}
                  </div>
                  <div className="w-[650px] group-hover:bg-[#333] rounded-r-[10px] text-white p-[10px] h-[100%] shadow-lg">
                    <h2 className="text-[20px]">{item.description}</h2>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Subjects;
