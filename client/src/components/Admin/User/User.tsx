import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserType } from "../../../interface/interface";
import { changeUserStatus } from "../../../services/user.service";
import {
  faCircleUser,
  faLock,
  faLockOpen,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface Props {
  user: UserType;
}
export const User: React.FC<Props> = ({ user }) => {
  const [lock, setLock] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <>
      <tr>
        <td className="p-[10px] bg-white border-y-[1px]">
          {user.image ? (
            <img className="w-[24px] h-[24px] mr-[10px]" src={user.image} />
          ) : (
            <FontAwesomeIcon
              className="text-[24px] mr-[10px]"
              icon={faCircleUser}
            />
          )}{" "}
          {user.firstName} {user.lastName}
        </td>
        <td className="p-[10px] bg-white border-y-[1px]">{user.email}</td>
        <td className="p-[10px] bg-white border-y-[1px]">
          <button
            className={`p-[5px] w-[150px] text-white rounded-[3px] ${
              user.status ? "bg-[#3f3]" : "bg-[#f00]"
            } `}
          >
            {user.status ? "Đang hoạt động" : "Ngừng hoạt động"}
          </button>
        </td>
        <td className="p-[10px] pl-[105px] bg-white border-y-[1px] border-r-[1px]">
          {user.role === "ADMIN" ? (
            <>
              <FontAwesomeIcon
                icon={faLock}
                className="mr-[30px] text-[20px] text-[#aaa]"
              />
            </>
          ) : user.status ? (
            <FontAwesomeIcon
              onClick={() =>
                dispatch(changeUserStatus({ id: user.id, status: user.status }))
              }
              icon={faLockOpen}
              className="mr-[25px] cursor-pointer text-[20px] text-[#3f3]"
            />
          ) : (
            <FontAwesomeIcon
              onClick={() =>
                dispatch(changeUserStatus({ id: user.id, status: user.status }))
              }
              icon={faLock}
              className="mr-[30px] cursor-pointer text-[20px] text-[#f00]"
            />
          )}
          <FontAwesomeIcon
            className="mr-[30px] cursor-pointer text-[#f80]  text-[20px]"
            icon={faPenToSquare}
          />
        </td>
      </tr>
    </>
  );
};
export default User;
