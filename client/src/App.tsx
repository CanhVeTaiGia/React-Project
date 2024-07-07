import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import UserManager from "./components/Admin/User/UsersManager";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="usermanager" element={<UserManager />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
