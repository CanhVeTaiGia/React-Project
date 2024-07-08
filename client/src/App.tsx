import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import UserManager from "./components/Admin/User/UsersManager";
import CourseManager from "./components/Admin/Course/CourseManager";
import Register from "./pages/register/Register";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="usermanager" element={<UserManager />}></Route>
          <Route path="coursemanager" element={<CourseManager />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
