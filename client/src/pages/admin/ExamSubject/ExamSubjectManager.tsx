import { useDispatch, useSelector } from "react-redux";
import { ExamSubjectHeader } from "../../../components/Header/Header";
import { ExamSubjectType, RootType } from "../../../interface/interface";
import { useEffect, useState } from "react";
import { getAllExamSubject } from "../../../services/examSubject.service";
import ExamSubject from "./ExamSubject";
import { AddAndEditExamSubject, DeleteSubject } from "../../../components/Modal/Modal";

const ExamSubjectManager: React.FC = () => {
  const data = useSelector((state: RootType) => {
    return state.examSubjects;
  });

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [currentSubjectId, setCurrentSubjectId] = useState<number>(0);

  const [addAndEditExamSubject, setAddAndEditExamSubject] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const showDeleteModal = (id: number) => {
    setDeleteModal(true);
    setCurrentSubjectId(id);
  }

  const hideDeleteModal = () => {
    setDeleteModal(false);
  }

  const examSubjects = Array.isArray(data.examSubjects)? data.examSubjects : [data.examSubjects]

  const setAddOrEdit = (id: number) => {
    setCurrentSubjectId(id);
    setAddAndEditExamSubject(true);
  };

  const hideAddOrEdit = () => {
    setAddAndEditExamSubject(false);
  }

  useEffect(() => {
    dispatch(getAllExamSubject());
  }, []);
  return (
    <>
    {
      deleteModal && <DeleteSubject id={currentSubjectId} hideDeleteModal={hideDeleteModal}/>
    }
      {addAndEditExamSubject && (
        <AddAndEditExamSubject hideAddOrEdit={hideAddOrEdit} examSubjectId={currentSubjectId} />
      )}
      <div className="w-[100%] h-[95vh]">
        <div className="flex flex-col justify-between">
          <ExamSubjectHeader setAddOrEdit={setAddOrEdit}/>
          <table className="mt-[20px] border-[1px] border-t-[#bbb]">
            <thead>
              <tr>
                <th className="text-center border-b-[1px] p-[10px] w-[5%] border-[#bbb] border-l-[1px]">
                  STT
                </th>
                <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[10%]">
                  Tiêu đề
                </th>
                <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[30%]">
                  Nội dung
                </th>
                <th className="text-start border-b-[1px] border-[#bbb]  p-[10px]">
                  Khóa thi
                </th>
                <th className="border-[#bbb] border-b-[1px] border-r-[1px]">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody>
              {data.examSubjects.map((item: ExamSubjectType, index: number) => {
                return (
                  <ExamSubject setAddOrEdit={setAddOrEdit} showDeleteModal={showDeleteModal} key={item.id} index={index} examSubject={item} />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ExamSubjectManager;
