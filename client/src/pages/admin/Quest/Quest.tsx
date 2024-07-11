import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuestType, RootType } from "../../../interface/interface";
import { useEffect, useState } from "react";
import { getAllExam, getExamById } from "../../../services/exam.service";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  quest: QuestType;
  index: number;
  showAddAndEditModal: (quest: QuestType) => void;
}
const Quest: React.FC<Props> = ({ quest, index, showAddAndEditModal }) => {
  const dispatch = useDispatch();
  const { exams }: any = useSelector((state: RootType) => {
    return state.exams;
  });

  console.log(11111, quest);
  

  const examArr = exams ? (Array.isArray(exams) ? exams : [exams]) : [];

  const handleEdit = () => {
    showAddAndEditModal(quest);
  };

  useEffect(() => {
    dispatch(getAllExam());
  }, []);
  return (
    <>
      <tr>
        <td className="bg-white text-center p-[10px] py-[5px] border-t-[1px]">
          {index + 1}
        </td>
        <td className="bg-white text-start p-[10px] border-t-[1px]">
          {quest.question}
        </td>
        <td className="bg-white text-start p-[10px] border-t-[1px]">
          {examArr.map((item) => {
            if (item.id === quest.examId) {
              return item.title;
            }
          })}
        </td>
        <td className="bg-white text-start p-[10px] py-[5px] border-t-[1px]">
          <select className="border-[1px] w-[80%] outline-none">
            {quest.options.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </td>
        <td className="bg-white text-start p-[10px] py-[5px] border-t-[1px]">
          {quest.answer}
        </td>
        <td className="bg-white p-[10px] text-center border-t-[1px]">
          <FontAwesomeIcon
            onClick={handleEdit}
            className="text-[20px] text-[#f60] mr-[20px] cursor-pointer"
            icon={faPenToSquare}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-[20px] text-[#f00] cursor-pointer"
          />
        </td>
      </tr>
    </>
  );
};

export default Quest;
