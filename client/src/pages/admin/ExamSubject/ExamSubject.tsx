import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExamSubjectType, RootType } from "../../../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCourseById } from "../../../services/course.service";

interface Props {
  examSubject: ExamSubjectType;
  index: number;
  setAddOrEdit: (id: number) => void; 
  showDeleteModal: (id: number) => void;
}
const ExamSubject: React.FC<Props> = ({ examSubject, index, setAddOrEdit, showDeleteModal }) => {
  const data: any = useSelector((state: RootType) => {
    return state.courses;
  });

  const dispatch = useDispatch();

  const handleDelete = () => {
    showDeleteModal(examSubject.id);
  }

  useEffect(() => {
    dispatch(getCourseById(examSubject.courseId));
  }, []);
  return (
    <>
      <tr>
        <td className="bg-white text-center p-[10px] w-[5%] border-t-[1px]">
          {index + 1}
        </td>
        <td className="bg-white text-start p-[10px] w-[10%] border-t-[1px]">
          {examSubject.title}
        </td>
        <td className="bg-white text-start p-[10px] py-[5px] border-t-[1px]">
          {examSubject.description}
        </td>
        <td className="bg-white text-start p-[10px] py-[5px] border-t-[1px]">
          {data.editCourse.title}
        </td>
        <td className="bg-white p-[10px] text-center border-t-[1px]">
          <FontAwesomeIcon
          onClick={() => setAddOrEdit(examSubject.id)}
            className="text-[20px] text-[#f60] mr-[20px] cursor-pointer"
            icon={faPenToSquare}
          />
          <FontAwesomeIcon
          onClick={handleDelete}
            icon={faTrash}
            className="text-[20px] text-[#f00] cursor-pointer"
          />
        </td>
      </tr>
    </>
  );
};
export default ExamSubject;
