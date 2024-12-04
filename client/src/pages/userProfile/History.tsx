import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../services/user.service";
import { getAllExam, getExamById } from "../../services/exam.service";
import { ExamType, HistoryType, RootType } from "../../interface/interface";
import { getUserHistory } from "../../services/quest.service";

const History: React.FC = () => {
  const [userId, setUserId] = useState<number>(() => {
    const userId = localStorage.getItem("userId");
    return userId ? parseInt(JSON.parse(userId)) : 0;
  });
  const dispatch = useDispatch();

  const { histories }: any = useSelector((state: RootType) => {
    return state.histories;
  });
  const { users }: any = useSelector((state: RootType) => {
    return state.users;
  });
  const { exams }: any = useSelector((state: RootType) => {
    return state.exams;
  });

  useEffect(() => {
    dispatch(getUserHistory(userId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllExam());
  }, []);

  return (
    <>
      <div className="w-[100%] px-[120px] mt-[20px] gap-[10px] flex flex-wrap">
        {histories.map((item: HistoryType) => (
          <div key={item.id} className="w-[49%] text-white border-[1px] h-[100px] rounded-[10px] p-[20px]">
            <h2 className="mb-[10px]">Đề thi: {exams.length > 0? exams.filter((subItem: any) => {
              return subItem.id === item.examId
            })[0].title : ""}</h2>
            <p>Điểm: {item.score}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
