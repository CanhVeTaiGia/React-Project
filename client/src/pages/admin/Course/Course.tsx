import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CourseType } from "../../../interface/interface";
import { useDispatch } from "react-redux";
import { deleteCourse, getAllCourse } from "../../../services/course.service";

interface Props {
  course: CourseType;
  index: number;
  setCourseToEditOrAdd: (id: number) => void;
  showDeleteModal: (id: number) => void;
}
const Course: React.FC<Props> = ({ course, index, setCourseToEditOrAdd,showDeleteModal }) => {
  const dispatch = useDispatch();

 
  return (
    <tr>
      <td className="bg-white text-center p-[10px] w-[5%] border-t-[1px]">
        {index + 1}
      </td>
      <td className="bg-white text-start p-[10px] w-[20%] border-t-[1px]">
        {course.title}
      </td>
      <td className="bg-white text-start p-[10px] py-[5px] border-t-[1px]">
        {course.description}
      </td>
      <td className="bg-white p-[10px] text-center border-t-[1px]">
        <FontAwesomeIcon
          onClick={() => setCourseToEditOrAdd(course.id)}
          className="text-[20px] text-[#f60] mr-[20px] cursor-pointer"
          icon={faPenToSquare}
        />
        <FontAwesomeIcon
          onClick={() => showDeleteModal(course.id)}
          className="text-[20px] text-[#f00] cursor-pointer"
          icon={faTrash}
        />
      </td>
    </tr>
  );
};

export default Course;
