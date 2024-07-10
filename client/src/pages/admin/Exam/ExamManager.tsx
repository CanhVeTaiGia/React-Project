import { useEffect, useState } from "react";
import { ExamHeader } from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllExam } from "../../../services/exam.service";
import { ExamType, RootType } from "../../../interface/interface";
import Exam from "./Exam";
import { AddAndEditExam } from "../../../components/Modal/Modal";

const ExamManager: React.FC = () => {
  const data: any = useSelector((state: RootType) => {
    return state.exams;
  });

  const [currentExamId, setCurrentExamId] = useState<number>(0);

  const [addAndEditModal, setAddAndEditModal] = useState<boolean>(false);
  
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllExam());
  }, []);
  return (
    <>
    {addAndEditModal && <AddAndEditExam />}
      <div className="w-[100%] h-[95vh]">
        <div className="flex flex-col justify-between">
          <ExamHeader />
          <table className="mt-[20px] border-[1px] border-t-[#bbb]">
            <thead>
              <tr>
                <th className="text-center border-b-[1px] p-[10px] w-[3%] border-[#bbb] border-l-[1px]">
                  STT
                </th>
                <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[15%]">
                  Tiêu đề
                </th>
                <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[30%]">
                  Mô tả
                </th>
                <th className="text-start w-[5%] border-b-[1px] border-[#bbb] p-[10px]">
                  Môn thi
                </th>
                <th className="text-start w-[5%] border-b-[1px] border-[#bbb]  p-[10px]">
                  Thời gian
                </th>
                <th className="border-[#bbb] w-[5%] border-b-[1px] border-r-[1px]">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody>
              {data.exams.map((item: ExamType, index: number) => {
                return <Exam key={item.id} index={index} exam={item} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ExamManager;
