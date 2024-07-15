import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { ExamType, RootType } from "../../../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { getAllExamSubject } from "../../../services/examSubject.service";

interface Props {
  exam: ExamType;
  index: number;
  showModal: (exam: ExamType) => void;
  showDeleteModal: (id: number) => void;
}
const Exam: React.FC<Props> = ({ exam, index, showModal, showDeleteModal }) => {
  const dispatch = useDispatch();
  const data: any = useSelector((state: RootType) => {
    return state.examSubjects;
  });

  const foundSubject = data.examSubjects.find((item: ExamType) => {
    return item.id === exam.examSubjectId;
  });

  // const {courses} = useSelector((state: RootType) => {
  //   return state.courses;
  // });

  // const courseArr = Array.isArray(courses)? courses : 

  useEffect(() => {
    dispatch(getAllExamSubject());
  }, [])

  useEffect(() => {
    dispatch(getAllExamSubject());
  }, []);
  return (
    <tr>
      <td className="bg-white text-center p-[10px] py-[5px] border-t-[1px]">
        {index + 1}
      </td>
      <td className="bg-white text-start p-[10px] border-t-[1px]">
        {exam.title}
      </td>
      <td className="bg-white text-start p-[10px] border-t-[1px]">
        {exam.description}
      </td>

      <td className="bg-white text-start p-[10px] py-[5px] border-t-[1px]">
        {foundSubject ? foundSubject.title : null}
      </td>
      <td className="bg-white text-start p-[10px] py-[5px] border-t-[1px]">
        {exam.duration} phút
      </td>
      <td className="bg-white p-[10px] text-center border-t-[1px]">
        <FontAwesomeIcon
          onClick={() => showModal(exam)}
          className="text-[20px] text-[#f60] mr-[20px] cursor-pointer"
          icon={faPenToSquare}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => showDeleteModal(exam.id)}
          className="text-[20px] text-[#f00] cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default Exam;
