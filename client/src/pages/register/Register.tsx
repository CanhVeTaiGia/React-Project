import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import { UserType, Warning } from "../../interface/interface";
import { baseUrl } from "../../baseAPI/baseURL";
import { ExistedUser } from "../../components/Modal/Modal";

const Register: React.FC = () => {
  const [isExisted, setIsExisted] = useState<boolean>(false);
  const navigate = useNavigate();

  const [warning, setWarning] = useState<Warning>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const [user, setUser] = useState<UserType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    status: true,
    password: "",
    role: "USER",
  });

  const resetInput = () => {
    return setUser({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      status: true,
      password: "",
      role: "USER",
    });
  };

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
    if (
      warning.email ||
      warning.firstName ||
      warning.lastName ||
      warning.password
    ) {
      return;
    }
    if (
      user.email === "" ||
      user.password === "" ||
      user.firstName === "" ||
      user.password === ""
    ) {
      return;
    }
    if (response.data.length > 0) {
      return setIsExisted(true);
    } else {
      let cryptedPass = bcrypt.hashSync(user.password, 10);
      baseUrl.post("users", { ...user, password: cryptedPass });
      navigate("/login");
      resetInput();
    }
  };

  const hideModal = () => {
    setIsExisted(false);
  };

  return (
    <>
      {isExisted ? <ExistedUser hideModal={hideModal} /> : ""}
      <div className="w-[100%] h-[100vh] flex justify-center items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-react-48d03.appspot.com/o/registerBackground%2Fregister.jpg?alt=media&token=d1da0e1b-c468-4f39-b343-ae45d6845467"
          className="w-[40%] h-[100vh]"
        />
        <form onSubmit={handleSubmit} className="w-[60%] h-[100vh] p-[40px]">
          <h2 className="font-[600] text-[44px] ">Đăng kí</h2>
          <div className="w-[100%] mt-[50px] flex gap-[20px]">
            <div className="w-[50%] relative">
              <label className="outline-none text-[24px]">Họ</label>
              <input
                name="firstName"
                // value={}
                onChange={handleChange}
                className="outline-none pl-[10px] w-[100%] h-[40px] border-[1px] mt-[10px] rounded-[4px]"
                type="text"
              />
              {warning.firstName ? (
                <p className="text-[#f00] absolute">Họ không được để trống</p>
              ) : (
                ""
              )}
            </div>
            <div className="w-[50%] relative">
              <label className="text-[24px]">Tên</label>
              <input
                name="lastName"
                onChange={handleChange}
                className="outline-none w-[100%] h-[40px] border-[1px] mt-[10px] rounded-[4px] pl-[10px]"
                type="text"
              />
              {warning.lastName ? (
                <p className="text-[#f00] absolute">Tên không được để trống</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-[100%] mt-[50px] relative">
            <label className="text-[24px]">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="text"
              className="outline-none w-[100%] h-[40px] border-[1px] mt-[10px] rounded-[4px] pl-[10px]"
            />
            {warning.email ? (
              <p className="text-[#f00] absolute">Email không được để trống</p>
            ) : (
              ""
            )}
          </div>
          <div className="w-[100%] mt-[50px] relative">
            <label className="text-[24px]">Mật khẩu</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              className="outline-none w-[100%] h-[40px] border-[1px] mt-[10px] rounded-[4px] pl-[10px]"
            />
            {warning.password ? (
              <p className="text-[#f00] absolute">
                Mật khẩu không được để trống
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-[100%] flex justify-end mt-[10px]">
            <p
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-[#00f] cursor-pointer"
            >
              Đăng nhập
            </p>
          </div>
          <div className="w-[100%] flex justify-center">
            <button className="w-[200px] h-[50px] bg-[#08f] rounded-[5px] text-white">
              Đăng kí
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
