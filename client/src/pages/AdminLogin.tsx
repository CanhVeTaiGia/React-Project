import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../interface/interface";
import { getAdminUser } from "../services/user.service";

const AdminLogin: React.FC = () => {
  const admin = useSelector((state: RootType) => {
    return state.users;
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  };

  const handleSubmit = () => {};

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
          <input
            onChange={handleChange}
            placeholder="Email"
            type="text"
            className="w-[100%] pl-[10px] h-[30px] outline-none border-[1px]"
          />
          <input
            onChange={handleChange}
            placeholder="Mật khẩu"
            type="password"
            className="w-[100%] pl-[10px] mt-[20px] outline-none h-[30px] border-[1px]"
          />
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
