import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import UserManager from "./components/UsersManager";

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
