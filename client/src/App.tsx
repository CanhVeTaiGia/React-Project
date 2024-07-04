import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

const App: React.FC = () => {
  return <>
  <Routes>
    <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}></Route>
    <Route path="/admin" element={<Admin/>}></Route>
  </Routes>
  </>;
};

export default App;
