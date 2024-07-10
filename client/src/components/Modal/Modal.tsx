import { SetStateAction, useEffect, useState } from "react";
import {
  CourseType,
  CourseWarning,
  ExamSubjectType,
  RootType,
  UserType,
  Warning,
} from "../../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from "bcryptjs-react";
import {
  addUser,
  changeUserStatus,
  findEmail,
} from "../../services/user.service";
import { baseUrl } from "../../baseAPI/baseURL";
import {
  addCourse,
  deleteCourse,
  editCourse,
  getAllCourse,
  getCourseById,
} from "../../services/course.service";
import { current } from "@reduxjs/toolkit";
import {
  addExamSubject,
  deleteExamSubject,
  getExamSubjectById,
  updateExamSubject,
} from "../../services/examSubject.service";

interface Props {
  showModal: boolean;
  changeModal: () => void;
  typeShowModal: "EDIT" | "ADD";
}

export const AddAndEditUser: React.FC<Props> = ({
  showModal,
  changeModal,
  typeShowModal,
}) => {
  const [warning, setWarning] = useState({
    name: true,
    email: true,
    password: true,
  });

  const resetInput = () => {
    return setUser({
      id: 0,
      name: "",
      email: "",
      status: true,
      password: "",
      role: "ADMIN",
    });
  };

  const [isExisted, setIsExisted] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [user, setUser] = useState<UserType>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    status: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWarning((prevWarning) => ({
      ...prevWarning,
      [name]: value !== "",
    }));
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await baseUrl.get(`users?email=${user.email}`);

    if (!warning.email || !warning.name || !warning.password) {
      return;
    }
    if (user.email === "" || user.password === "" || user.name === "") {
      return;
    }
    if (response.data.length > 0) {
      return setIsExisted(true);
    } else {
      let cryptedPass = bcrypt.hashSync(user.password, 10);
      dispatch(addUser({ ...user, password: cryptedPass }));
      changeModal();
      resetInput();
    }
  };

  return (
    <>
      <div className="h-[100vh] top-0 left-0 absolute z-50 w-[100%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="p-[20px] rounded-[5px] bg-white w-[700px]"
        >
          <div className="flex justify-between">
            <h1 className="text-[20px]">Thêm người dùng</h1>
            <p onClick={changeModal} className="cursor-pointer text-[20px]">
              X
            </p>
          </div>
          <div className="relative mt-[20px]">
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Tên"
              className="p-[10px] outline-none w-[100%] rounded-[3px] mb-[30px] border-[1px]"
            />
            {warning.name ? (
              ""
            ) : (
              <p className="text-[#f00] text-[12px] absolute top-[45px]">
                Tên không được để trống
              </p>
            )}
          </div>
          <div className="relative">
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="Email"
              className="p-[10px] outline-none w-[100%] rounded-[3px] mb-[30px] border-[1px]"
            />
            {warning.email ? (
              ""
            ) : (
              <p className="text-[#f00] top-[45px] text-[12px] absolute">
                Email không được để trống
              </p>
            )}
          </div>
          <div className="relative">
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Mật khẩu"
              className="p-[10px] outline-none w-[100%] rounded-[3px] mb-[30px] border-[1px]"
            />
            {warning.password ? (
              ""
            ) : (
              <p className="text-[#f00] rounded-[3px] top-[45px] text-[12px] absolute">
                Mật khẩu không được để trống
              </p>
            )}
          </div>
          <div className="w-[100%] flex justify-center">
            <button
              className="bg-[#1E90FF] text-white rounded-[3px]
            px-[20px] py-[5px]"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

interface ExistedUserProps {
  hideModal: () => void;
}
export const ExistedUser: React.FC<ExistedUserProps> = ({ hideModal }) => {
  return (
    <>
      <div className="absolute z-[1000] w-[100%] flex items-center justify-center h-[100vh] bg-[#eeeeeead]">
        <div className="w-[500px] bg-[#fff] px-[40px] p-[20px] rounded-[5px] shadow-md">
          <h2 className="text-[20px] mb-[20px] border-b-[1px] py-[10px]">
            Người dùng đã tồn tại
          </h2>
          <div className="flex justify-end">
            <button
              onClick={() => hideModal()}
              className="h-[40px] w-[80px] text-white rounded-[3px] bg-[#08f]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface LockProps {
  hideLock: () => void;
  user: UserType;
}
export const Lock: React.FC<LockProps> = ({ hideLock, user }) => {
  const dispatch = useDispatch();
  const handleLock = () => {
    dispatch(changeUserStatus({ id: user.id, status: user.status }));
    hideLock();
  };
  return (
    <>
      <div className="w-[100%] absolute h-[100vh] top-0 left-0 flex justify-center items-center">
        <div className="w-[500px] bg-white p-[20px] flex flex-col">
          <div className="flex justify-between py-[10px] border-b-[1px]">
            <h2>Bạn có chắc muốn khóa tài khoản này?</h2>
            <p className="cursor-pointer" onClick={hideLock}>
              X
            </p>
          </div>
          <div className="flex justify-end gap-[20px] mt-[20px]">
            <button
              onClick={hideLock}
              className="h-[30px] w-[120px] rounded-[3px] border-[1px]"
            >
              Không
            </button>
            <button
              onClick={handleLock}
              className="h-[30px] w-[120px] rounded-[3px] text-white bg-[#f00]"
            >
              Có
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface AddOrEditCourseProps {
  courseEdit: {
    id: number;
    type: "add" | "edit";
  };
  setCourseToEditOrAdd: (id: number) => void;
  hideAddOrEditCourse: () => void;
}

export const AddOrEditCourse: React.FC<AddOrEditCourseProps> = ({
  courseEdit,
  hideAddOrEditCourse,
}) => {
  const data: any = useSelector((state: RootType) => state.courses);
  const [course, setCourse] = useState<CourseType>({
    id: 0,
    title: "",
    description: "",
  });
  const [warning, setWarning] = useState<CourseWarning>({
    title: false,
    description: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseEdit.id !== 0) {
      dispatch(getCourseById(courseEdit.id));
    }
  }, [courseEdit.id, dispatch]);

  useEffect(() => {
    if (courseEdit.id !== 0 && data.editCourse) {
      setCourse(data.editCourse);
    }
  }, [courseEdit.id, data.editCourse]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (warning.title || warning.description) {
      return;
    }
    if (courseEdit.id) {
      dispatch(editCourse(course));
    } else {
      dispatch(addCourse(course));
    }
    hideAddOrEditCourse();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWarning((prev) => ({
      ...prev,
      [name]: value === "",
    }));
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-[100%] absolute h-[100vh] top-0 left-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] p-[20px] shadow-lg border-[1px] bg-white rounded-[5px]"
      >
        <div className="flex justify-between mb-[10px]">
          <h2>{courseEdit.id === 0 ? "Thêm" : "Sửa"} Khóa Thi</h2>
          <p onClick={hideAddOrEditCourse} className="cursor-pointer">
            X
          </p>
        </div>
        <div className="w-[100%] h-[35px] mb-[20px]">
          <input
            onChange={handleChange}
            className="w-[100%] outline-none p-[5px] pl-[10px] border-[1px] rounded-[3px]"
            placeholder="Tiêu đề"
            value={course.title}
            type="text"
            name="title"
          />
        </div>
        <div className="w-[100%] h-[150px] mb-[20px]">
          <textarea
            className="w-[100%] p-[5px] h-[100%] outline-none pl-[10px] border-[1px] resize-none rounded-[3px]"
            placeholder="Mô tả"
            value={course.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="w-[100%] h-[35px] mb-[20px] flex justify-center">
          <button className="w-[120px] h-[100%] text-white rounded-[3px] bg-blue-500">
            {courseEdit.id ? "Sửa" : "Thêm"}
          </button>
        </div>
      </form>
    </div>
  );
};

interface AddAndEditExamSubjectProps {
  examSubjectId: number;
  hideAddOrEdit: () => void;
}

export const AddAndEditExamSubject: React.FC<AddAndEditExamSubjectProps> = ({
  examSubjectId,
  hideAddOrEdit,
}) => {
  const [examSubject, setExamSubject] = useState<ExamSubjectType>({
    id: 0,
    title: "",
    description: "",
    courseId: 0,
  });

  
  const { examSubjects, editSubject } = useSelector(
    (state: RootType) => state.examSubjects
    );
    const dispatch = useDispatch();
    const courses: any = useSelector((state: any) => {
      
      return state.courses.courses;
    });
    
    const foundCourse = Array.isArray(courses)? courses : [courses]
  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (examSubjectId) {
      dispatch(updateExamSubject({...examSubject}));
    } else {
      dispatch(addExamSubject(examSubject));
    }
    hideAddOrEdit();
  };
  
  useEffect(() => {
    if (examSubjectId) {
      dispatch(getExamSubjectById(examSubjectId));
    }
  }, [examSubjectId, dispatch]);

  useEffect(() => {
    if (editSubject && examSubjectId) {
      setExamSubject(editSubject);
    }
  }, [examSubjectId, editSubject]);
  
  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getAllCourse());
  }, []);
  
  const handleChange = (
    e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
    ) => {
    const { name, value } = e.target;
    setExamSubject({ ...examSubject, [name]: value });
  };

  return (
    <div className="w-[100%] z-[200] h-[100vh] absolute top-0 left-0 flex justify-center items-center">
      <form
        className="w-[500px] rounded-[5px] shadow-md bg-white p-[20px]"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <h2 className="text-[20px]">
            {examSubjectId ? "Sửa" : "Thêm"} Môn Thi
          </h2>
          <p onClick={hideAddOrEdit} className="cursor-pointer">
            X
          </p>
        </div>
        <div className="w-[100%] mt-[20px] h-[30px]">
          <input
            value={examSubject.title}
            onChange={handleChange}
            name="title"
            placeholder="Tiêu đề"
            type="text"
            className="outline-none pl-[10px] rounded-[3px] w-[100%] h-[100%] border-[1px]"
          />
        </div>
        <div className="w-[100%] mt-[20px] h-[120px]">
          <textarea
            value={examSubject.description}
            onChange={handleChange}
            name="description"
            placeholder="Mô tả"
            className="outline-none p-[10px] rounded-[3px] w-[100%] h-[100%] border-[1px] resize-none"
          />
        </div>
        <div className="w-[100%] flex justify-center mt-[20px] h-[30px]">
          <select
            onChange={handleChange}
            name="courseId"
            className="w-[100%] outline-none rounded-[3px] text-[14px] border-[1px]"
            value={examSubject.courseId}
          >
            <option hidden>Khóa thi</option>
            {foundCourse.map((item: ExamSubjectType) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[100%] h-[30px] mt-[20px] flex justify-center">
          <button className="w-[120px] h-[100%] rounded-[5px] text-white bg-[#08f]">
            {examSubjectId ? "Sửa" : "Thêm"}
          </button>
        </div>
      </form>
    </div>
  );
};

interface ConfirmDeleteCourseProps {
  id: number;
  hideDeleteModal: () => void;
}
export const ConfirmDeleteCourse: React.FC<ConfirmDeleteCourseProps> = ({
  id,
  hideDeleteModal,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    hideDeleteModal();
    dispatch(deleteCourse(id));
  };
  return (
    <>
      <div className="w-[100%] absolute top-0 left-0 h-[100vh] flex justify-center items-center">
        <div className="w-[500px] p-[20px] rounded-[5px] bg-white shadow-md">
          <h2 className="text-[20px] py-[10px] border-b-[1px]">
            Bạn có chắc muốn xóa
          </h2>
          <div className="w-[100%] mt-[10px] gap-[10px] flex justify-end">
            <button
              onClick={hideDeleteModal}
              className="w-[100px] rounded-[3px] px-[10px] py-[5px] border-[1px]"
            >
              Hủy
            </button>
            <button
              className="w-[100px] rounded-[3px] px-[10px] py-[5px] bg-[#f00]"
              onClick={handleDelete}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface DeleteSubjectProps {
  id: number;
  hideDeleteModal: () => void;
}
export const DeleteSubject: React.FC<DeleteSubjectProps> = ({
  id,
  hideDeleteModal,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExamSubject(id));
    hideDeleteModal();
  };
  return (
    <>
      <div className="w-[100%] absolute top-0 left-0 h-[100vh] flex justify-center items-center">
        <div className="w-[500px] p-[20px] rounded-[5px] bg-white shadow-md">
          <h2 className="text-[20px] py-[10px] border-b-[1px]">
            Bạn có chắc muốn xóa
          </h2>
          <div className="w-[100%] mt-[10px] gap-[10px] flex justify-end">
            <button
              onClick={hideDeleteModal}
              className="w-[100px] rounded-[3px] px-[10px] py-[5px] border-[1px]"
            >
              Hủy
            </button>
            <button
              className="w-[100px] rounded-[3px] px-[10px] py-[5px] bg-[#f00]"
              onClick={handleDelete}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface AddAndEditExamProps{
  id: number,
  hideModal: () => void,
}
export const AddAndEditExam: React.FC = () => {
  return <></>
}