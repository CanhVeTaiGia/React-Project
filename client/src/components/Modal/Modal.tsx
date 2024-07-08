import { useState } from "react";
import { UserType } from "../../interface/interface";
import { useDispatch } from "react-redux";
import bcrypt from "bcryptjs-react";
import { addUser, findEmail } from "../../services/user.service";
import { baseUrl } from "../../baseAPI/baseURL";

interface Props {
  showModal: boolean;
  changeModal: () => void;
  typeShowModal: "EDIT" | "ADD";
}

export const AddAndEditUser: React.FC<Props> = ({
  showModal,
  changeModal,
  typeShowModal,
}) => {
  const [warning, setWarning] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
  });

  const resetInput = () => {
    return setUser({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      status: true,
      password: "",
      role: "ADMIN",
    });
  };

  const [isExisted, setIsExisted] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [user, setUser] = useState<UserType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "ADMIN",
    status: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWarning((prevWarning) => ({
      ...prevWarning,
      [name]: value !== "",
    }));
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      changeModal();
      resetInput();
    }
  };

  return (
    <>
      <div className="h-[100vh] top-0 left-0 absolute z-50 w-[100%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="p-[20px] rounded-[5px] bg-white w-[700px]"
        >
          <div className="flex justify-between">
            <h1 className="text-[20px]">
              {typeShowModal === "EDIT" ? "Sửa" : "Thêm"} người dùng
            </h1>
            <p onClick={changeModal} className="cursor-pointer text-[20px]">
              X
            </p>
          </div>
          <div className="w-[100%] relative flex justify-between gap-[10px] mt-[30px] mb-[30px]">
            <input
              onChange={handleChange}
              name="firstName"
              type="text"
              placeholder="Họ"
              className="pl-[10px] outline-none w-[100%] h-[30px] rounded-[3px] border-[1px]"
            />
            {warning.firstName ? (
              ""
            ) : (
              <p className="text-[#f00] text-[12px] absolute top-[30px]">
                Họ không được để trống
              </p>
            )}
            <input
              onChange={handleChange}
              name="lastName"
              type="text"
              placeholder="Tên"
              className="pl-[10px] outline-none w-[100%] h-[30px] rounded-[3px] border-[1px]"
            />
            {warning.lastName ? (
              ""
            ) : (
              <p className="text-[#f00] text-[12px] left-[335px] absolute top-[30px]">
                Tên không được để trống
              </p>
            )}
          </div>
          <div className="relative">
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="Email"
              className="pl-[10px] outline-none w-[100%] mb-[30px] border-[1px]"
            />
            {warning.email ? (
              ""
            ) : (
              <p className="text-[#f00] rounded-[3px] top-[30px] text-[12px] absolute">
                Email không được để trống
              </p>
            )}
          </div>
          <div className="relative">
            <input
              onChange={handleChange}
              name="password"
              type="text"
              placeholder="Mật khẩu"
              className="pl-[10px] outline-none w-[100%] rounded-[3px] mb-[30px] border-[1px]"
            />
            {warning.password ? (
              ""
            ) : (
              <p className="text-[#f00] rounded-[3px] top-[30px] text-[12px] absolute">
                Mật khẩu không được để trống
              </p>
            )}
          </div>
          <div className="w-[100%] flex justify-center">
            <button
              className="bg-[#1E90FF] text-white rounded-[3px]
            px-[20px] py-[5px]"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

interface ExistedUserProps {
  hideModal: () => void;
}
export const ExistedUser: React.FC<ExistedUserProps> = ({ hideModal }) => {
  return (
    <>
      <div className="absolute z-[1000] w-[100%] flex items-center justify-center h-[100vh] bg-[#eeeeeead]">
        <div className="w-[500px] bg-[#fff] px-[40px] p-[20px] rounded-[5px] shadow-md">
          <h2 className="text-[20px] mb-[20px] border-b-[1px] py-[10px]">
            Người dùng đã tồn tại
          </h2>
          <div className="flex justify-end">
            <button
              onClick={() => hideModal()}
              className="h-[40px] w-[80px] text-white rounded-[3px] bg-[#08f]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Lock: React.FC = () => {
  return <>
    <div className="w-[100%] absolute h-[100vh] top-0 left-0 ">
      <div className="w-[500px] bg-white p-[20px]">
        
      </div>
    </div>
  </>;
};
