import { useDispatch, useSelector } from "react-redux";
import { ExamType, RootType } from "../../interface/interface";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllExam, getExamById } from "../../services/exam.service";

const Exams: React.FC = () => {
  const { exams }: any = useSelector((state: RootType) => {
    return state.exams;
  });

  const { id }: any = useParams();
  const currentId = Number(id?.split(1));
  const examArr = exams ? [...exams] : [];
  const dispatch = useDispatch();
  const filteredExam = examArr.filter((item: ExamType) => {
    return item.examSubjectId === currentId;
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllExam());
  }, []);
  return (
    <>
      <div className="px-[120px] gap-[20px] py-[20px] flex flex-wrap">
        {currentId
          ? filteredExam.map((item: ExamType) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/quest/:${item.id}`, { state: item.duration });
                  localStorage.setItem("count", JSON.stringify(item.duration));
                }}
                className="w-[600px] cursor-pointer rounded-l-[5px] bg-[#333] rounded-ee-[30px] group mb-[20px] flex"
              >
                <div className="w-[100px] rounded-l-[5px] h-[100px] text-[#4b0a40] group-hover:text-white group-hover:bg-[#ff5031] transition-all duration-300 bg-[#ff000055] text-[40px] flex justify-center items-center">
                  {item.title.charAt(0).toUpperCase()}
                </div>
                <div className="w-[500px] group-hover:bg-[#444] transition-all duration-300 rounded-ee-[30px] py-[5px] pl-[10px]">
                  <h2 className="text-[16px] text-[#f80] mb-[5px]">
                    {item.title}
                  </h2>
                  <p className="text-[#ddd] transition-all duration-300 group-hover:text-[#fff] text-[14px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          : exams.map((item: any) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/quest/:${item.id}`, { state: item.duration });
                  localStorage.setItem("count", JSON.stringify(item.duration));
                }}
                className="w-[600px] cursor-pointer rounded-l-[5px] bg-[#333] rounded-ee-[30px] group mb-[20px] flex"
              >
                <div className="w-[100px] rounded-l-[5px] h-[100px] text-[#4b0a40] group-hover:text-white group-hover:bg-[#ff5031] transition-all duration-300 bg-[#ff000055] text-[40px] flex justify-center items-center">
                  {item.title.charAt(0).toUpperCase()}
                </div>
                <div className="w-[500px] group-hover:bg-[#444] transition-all duration-300 rounded-ee-[30px] py-[5px] pl-[10px]">
                  <h2 className="text-[16px] text-[#f80] mb-[5px]">
                    {item.title}
                  </h2>
                  <p className="text-[#ddd] transition-all duration-300 group-hover:text-[#fff] text-[14px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Exams;
