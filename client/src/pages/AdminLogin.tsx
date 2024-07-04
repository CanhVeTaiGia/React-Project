import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootType, UserType } from "../interface/interface";
import { getAdminUser } from "../services/user.service";

const AdminLogin: React.FC = () => {
  const [empty, setEmpty] = useState({
    email: false,
    password: false,
  });
  const admin = useSelector((state: RootType) => {
    return state.users;
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email" && !value) {
      setEmpty({ ...empty, email: true });
    }
    if (name === "password" && !value) {
      setEmpty({ ...empty, email: true });
    }
    if (empty.email || empty.password) {
      return;
    }
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    
  };

  useEffect(() => {
    dispatch(getAdminUser());
  }, []);

  return (
    <>
      <div className="h-[100vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-[30px] w-[500px] border-[1px] rounded-[5px]"
        >
          <h2 className="text-center text-[24px] mb-[10px]">Admin Login</h2>
          <div className="mb-[20px]">
            <input
              onChange={handleChange}
              placeholder="Email"
              type="text"
              className="w-[100%] pl-[10px] h-[30px] outline-none border-[1px]"
            />
            {empty.password ? (
              <p className="text-red-500 text-[12px]">
                Email không được để trống
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-[20px]">
            <input
              onChange={handleChange}
              placeholder="Mật khẩu"
              type="password"
              className="w-[100%] pl-[10px] mt-[20px] outline-none h-[30px] border-[1px]"
            />
            {empty.password ? (
              <p className="text-red-500 text-[12px]">
                Mật khẩu không được để trống
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="mt-[30px] flex justify-center">
            <button className="h-[30px] w-[120px] rounded-[5px] bg-blue-500">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
