import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import UserManager from "./pages/admin/User/UsersManager";
import CourseManager from "./pages/admin/Course/CourseManager";
import Register from "./pages/register/Register";
import ExamSubjectManager from "./pages/admin/ExamSubject/ExamSubjectManager";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import ExamManager from "./pages/admin/Exam/ExamManager";
import QuestManager from "./pages/admin/Quest/QuestManager";
import Index from "./pages/home/Index";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="usermanager" element={<UserManager />}></Route>
          <Route path="coursemanager" element={<CourseManager />}></Route>
          <Route path="examSubject" element={<ExamSubjectManager />}></Route>
          <Route path="exam" element={<ExamManager />}></Route>
          <Route path="quest" element={<QuestManager />}></Route>
        </Route>
        <Route path="/" element={<Index/>}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
