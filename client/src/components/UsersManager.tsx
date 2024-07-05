import { useDispatch, useSelector } from "react-redux";
import { UserManagerHeader } from "./Header";
import User from "./User";
import { RootType, UserType } from "../interface/interface";
import { useEffect } from "react";
import { getAllUser } from "../services/user.service";

const UserManager: React.FC = () => {
  const data = useSelector((state: RootType) => {
    return state.users;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  return (
    <>
      <UserManagerHeader />
      <table className="mt-[20px] w-[100%] table-fixed">
        <thead>
          <tr>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] border-l-[#ccc] text-start">
              Họ
            </th>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] text-start">
              Tên
            </th>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] text-start">
              Email
            </th>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] text-start">
              Trạng thái
            </th>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] border-r-[#ccc] text-start">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user: UserType) => (
            <User user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default UserManager;
