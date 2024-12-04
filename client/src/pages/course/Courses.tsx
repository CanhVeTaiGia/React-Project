import { useDispatch, useSelector } from "react-redux";
import { CourseType, RootType } from "../../interface/interface";
import { useEffect } from "react";
import { getAllCourse } from "../../services/course.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Courses: React.FC = () => {
  const { courses }: any = useSelector((state: RootType) => {
    return state.courses;
  });

  const location = useLocation();

  const dispatch = useDispatch();

  const { id }: any = useParams();
  const currentId = parseInt(id.split(":")[1]);
  const courseArr = courses ? [...courses] : [];

  const filteredCourse = courseArr.filter((item) => {
    return item.id === currentId;
  });
  const navigate = useNavigate();

  const handleChangeTab = (id: number) => {

    if (currentId) {
      navigate(`/exam/${location.state}`);
    } else {
      navigate(`/subject/:${currentId}`);
    }
  };

  useEffect(() => {
    dispatch(getAllCourse());
  }, []);
  return (
    <>
      <div className="w-[100%] px-[120px] text-white mt-[20px]">
        <h2 className="text-[20px] flex-wrap text-[#f00] mb-[30px]">
          Các khóa học
        </h2>
        <div className="w-[100%] px-[10px] pb-[30px] flex justify-between flex-wrap">
          {currentId
            ? filteredCourse.map((item) => (
                <div
                  onClick={() => handleChangeTab(item.id)}
                  key={item.id}
                  className="w-[600px] cursor-pointer rounded-l-[5px] bg-[#333] rounded-ee-[30px] group mb-[20px] flex"
                >
                  <div className="w-[100px] rounded-l-[5px] h-[100px] group-hover:bg-[#ff5031] transition-all duration-300 bg-[#ff000055] text-[40px] flex justify-center items-center">
                    {item.title.charAt(0).toLocaleUpperCase()}
                  </div>
                  <div className="w-[500px] group-hover:bg-[#444] transition-all duration-300 rounded-ee-[30px] py-[5px] pl-[10px]">
                    <h2 className="text-[16px] text-[#f80] mb-[5px]">
                      {item.title}
                    </h2>
                    <p className="text-[14px]">{item.description}</p>
                  </div>
                </div>
              ))
            : courseArr.map((item: CourseType) => (
                <div
                  onClick={() => handleChangeTab(0)}
                  key={item.id}
                  className="w-[600px] cursor-pointer rounded-l-[5px] bg-[#333] rounded-ee-[30px] group mb-[20px] flex"
                >
                  <div className="w-[100px] rounded-l-[5px] h-[100px] group-hover:bg-[#ff5031] transition-all duration-300 bg-[#ff000055] text-[40px] flex justify-center items-center">
                    {item.title.charAt(0).toLocaleUpperCase()}
                  </div>
                  <div className="w-[500px] group-hover:bg-[#444] transition-all duration-300 rounded-ee-[30px] py-[5px] pl-[10px]">
                    <h2 className="text-[16px] text-[#f80] mb-[5px]">
                      {item.title}
                    </h2>
                    <p className="text-[14px]">{item.description}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
