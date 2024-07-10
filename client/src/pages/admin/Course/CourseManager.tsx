import { useDispatch, useSelector } from "react-redux";
import { CourseHeader } from "../../../components/Header/Header";
import Course from "./Course";
import { CourseType, RootType } from "../../../interface/interface";
import { useEffect, useState } from "react";
import { deleteCourse, getAllCourse } from "../../../services/course.service";
import {
  AddOrEditCourse,
  ConfirmDeleteCourse,
} from "../../../components/Modal/Modal";

const CourseManager: React.FC = () => {
  const data: any = useSelector((state: RootType) => {
    return state.courses;
  });

  const [courseEdit, setCourseEdit] = useState<{
    id: number;
    type: "add" | "edit";
  }>({
    id: 0,
    type: "add",
  });

  const [showAddOrEditCourse, setShowAddOrEditCourse] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const setCourseToEditOrAdd = (id: number) => {
    if (courseEdit.id === 0) {
      setCourseEdit({ id: 0, type: "add" });
    }
    setCourseEdit({
      id,
      type: "edit",
    });
    setShowAddOrEditCourse(true);
  };

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const showDeleteModal = (id: number) => {
    setDeleteModal(true);
    setCourseEdit({ id, type: "add" });
  };

  const hideDeleteModal = () => {
    setDeleteModal(false);
  };

  const hideAddOrEditCourse = () => {
    setShowAddOrEditCourse(false);
  };

  useEffect(() => {
    dispatch(getAllCourse());
  }, []);

  return (
    <>
      {deleteModal && <ConfirmDeleteCourse hideDeleteModal={hideDeleteModal} id={courseEdit.id}/>}
      {showAddOrEditCourse ? (
        <AddOrEditCourse
          courseEdit={courseEdit}
          hideAddOrEditCourse={hideAddOrEditCourse}
          setCourseToEditOrAdd={(id) => setCourseToEditOrAdd(id)}
        />
      ) : (
        ""
      )}

      <div className="flex flex-col h-[95vh] w-[100%]]">
        <CourseHeader setCourseToEditOrAdd={setCourseToEditOrAdd} />
        <table className="mt-[20px] border-[1px] border-t-[#bbb]">
          <thead>
            <tr>
              <th className="text-center border-b-[1px] p-[10px] w-[5%] border-[#bbb] border-l-[1px]">
                STT
              </th>
              <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[20%]">
                Tiêu đề
              </th>
              <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[60%]">
                Nội dung
              </th>
              <th className="border-[#bbb] border-b-[1px] border-r-[1px]">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {data.courses.map((item: CourseType, index: number) => {
              return (
                <Course
                  setCourseToEditOrAdd={setCourseToEditOrAdd}
                  showDeleteModal={showDeleteModal}
                  course={item}
                  key={item.id}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CourseManager;
