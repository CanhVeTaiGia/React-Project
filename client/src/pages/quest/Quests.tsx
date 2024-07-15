import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestType, RootType } from "../../interface/interface";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllQuest } from "../../services/quest.service";
import { getExamById } from "../../services/exam.service";
import { Result } from "../../components/Modal/Modal";

const Quests: React.FC = () => {
  const { quests }: any = useSelector((state: RootType) => {
    return state.quests;
  });

  const [correctAnswers, setCorrectAnswers] = useState<
    { answer: string; status: 0 | 1 }[]
  >([]);

  const { editExam }: any = useSelector((state: RootType) => {
    return state.exams;
  });

  const location = useLocation();

  const exam = Array.isArray(editExam) ? null : editExam;

  const [showResult, setShowResult] = useState<boolean>(false);

  // console.log(exam);
  // console.log(editExam);

  const [count, setCount] = useState<number>(() => {
    const data = localStorage.getItem('count');
    return data? Number(JSON.parse(data)) : location.state
  });

  const { id }: any = useParams();

  const questArr: QuestType[] = Array.isArray(quests) ? [...quests] : [];

  const currentId = parseInt(id.split(":")[1]);

  const filteredQuests = questArr.filter((item: QuestType) => {
    return item.examId === currentId;
  });
  const dispatch = useDispatch();
  // console.log(correctAnswers);

  const handleCheckAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCorrectAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.answer === name
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          answer: name,
          status: name === value ? 1 : 0,
        };
        return updatedAnswers;
      }
      return [...prevAnswers, { answer: name, status: name === value ? 1 : 0 }];
    });
  };

  useEffect(() => {
    if(showResult){
      return
    }
    if (count) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  });

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  const handleSubmit = () => {
    setShowResult(true);
  };

  useEffect(() => {
    dispatch(getExamById(currentId));
  }, []);

  useEffect(() => {
    dispatch(getAllQuest());
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      setShowResult(!showResult);
      localStorage.removeItem('count')
    }
  }, [count]);
  return (
    <>
      {showResult && (
        <Result
        examId={currentId}
          filteredQuests={filteredQuests}
          correctAnswers={correctAnswers}
        />
      )}
      <div className="px-[100px] overflow-hidden gap-[30px] flex flex-wrap pt-[30px] pb-[30px]">
        <div className="border-[1px] right-[50px] rounded-[10px] fixed w-[60px] py-[5px] text-white text-[24px] text-center">
          {count}
        </div>
        {currentId
          ? filteredQuests.map((item: QuestType, index: number) => (
              <div
                key={item.id}
                className="text-white border-[1px] w-[600px] border-[#f00] p-[20px] rounded-[20px]"
              >
                <h2 className="text-[16px] mb-[10px]">
                  Câu {index + 1}: {item.question}
                </h2>
                <ul className="pl-[20px]">
                  {item.options.map((subItem) => (
                    <li key={subItem} className="flex items-center gap-[10px]">
                      <input
                        id={`${item.id}`}
                        value={subItem}
                        onChange={handleCheckAnswer}
                        name={`${item.answer}`}
                        type="radio"
                      />{" "}
                      {subItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          : ""}
        <div className="w-[100%] flex justify-center">
          <button onClick={handleSubmit} className="w-[120px] h-[40px] border-[1px] text-white hover:border-[#f00] hover:text-[#f00] rounded-[5px]">
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
};

export default Quests;
