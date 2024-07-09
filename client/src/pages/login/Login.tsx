import { useLocation, useNavigate } from "react-router-dom";
import { UserType, Warning } from "../../interface/interface";
import { FormEvent, useState } from "react";
import { baseUrl } from "../../baseAPI/baseURL";
import bcrypt from "bcryptjs-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import Admin from "../admin/Admin";

const Login: React.FC = () => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [warning, setWarning] = useState<Warning>({
    email: false,
    password: false,
  });

  const [wrong, setWrong] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  const resetInput = () => {
    return setUser({
      email: "",
      password: "",
    });
  };

  const location = useLocation();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newWarnings = {
      ...warning,
      [name]: value === "",
    };
    setWarning(newWarnings);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await baseUrl.get(`users?email=${user.email}`);
    if (warning.email || warning.name || warning.password) {
      return;
    }
    if (response.data.length > 0) {
      let decryptedPass: boolean = bcrypt.compareSync(
        user.password,
        response.data[0].password
      );
      if (!decryptedPass) {
        setWrong({ ...wrong, password: true });
      }
      if (response.data[0].email !== user.email) {
        setWrong({ ...wrong, email: true });
      }
      if (wrong.email || wrong.password) {
        return;
      }
      if (response.data[0].email === user.email && decryptedPass) {
        localStorage.setItem("userId", response.data[0].id);
        navigate("/");
      }
    } else {
      return setWrong({ ...wrong, email: true, password: true });
    }
  };
  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center relative">
        <img
          className="w-[100%] h-[100vh] absolute z-0"
          src="https://firebasestorage.googleapis.com/v0/b/project-react-48d03.appspot.com/o/loginBackground%2FloginBg.png?alt=media&token=2c88d96c-15cd-4a57-82d5-35f1178fe282"
          alt="login"
        />
        <form
          onSubmit={handleSubmit}
          className="z-[100] bg-white w-[550px] p-[30px] shadow-lg rounded-[5px]"
        >
          <h2 className="text-center text-[32px] font-[600]">Đăng nhập</h2>
          <label className="font-[500] block text-[16px] mt-[30px]">
            Email
          </label>
          <div className="relative">
            <input
              value={user.email}
              onChange={handleChange}
              name="email"
              type="text"
              className="pl-[10px] outline-none mt-[10px] w-[100%] h-[40px] rounded-[5px] border-[1px]"
            />
            {warning.email ? (
              <p className="absolute text-[14px] text-red-500">
                Email không được để trống
              </p>
            ) : wrong.email ? (
              <p className="absolute text-[14px] text-red-500">
                Email không đúng
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="relative">
            <label className="font-[500] block text-[16px] mt-[30px]">
              Mật khẩu
            </label>
            <input
              value={user.password}
              onChange={handleChange}
              name="password"
              type={showPass ? "text" : "password"}
              className="pl-[10px] outline-none mt-[10px] w-[100%] h-[40px] rounded-[5px] border-[1px]"
            />
            {showPass ? (
              <FontAwesomeIcon
                onClick={() => setShowPass(false)}
                className="absolute right-[10px] bottom-[15%] cursor-pointer"
                icon={faEye}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={() => setShowPass(true)}
                className="absolute right-[10px] bottom-[15%] cursor-pointer"
              />
            )}
            {warning.password ? (
              <p className="absolute text-[14px] text-red-500">
                Mật khẩu không được để trống
              </p>
            ) : wrong.password ? (
              <p className="absolute text-[14px] text-red-500">
                Mật khẩu không đúng
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="w-[100%] flex justify-end pr-[1px] mt-[5px]">
            <p
              onClick={() => navigate("/register")}
              className="text-[15px] font-[400] text-[#08f] cursor-pointer hover:text-[#05f]"
            >
              Đăng kí
            </p>
          </div>
          <div className="mt-[30px] w-[100%] flex justify-center">
            <button className="w-[150px] rounded-[5px] text-white bg-[#08f] px-[10px] py-[5px]">
              Đăng Nhập
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
