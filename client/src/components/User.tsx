import { UserType } from "../interface/interface";

interface Props {
  user: UserType;
}
export const User: React.FC<Props> = ({ user }) => {
  return (
    <>
      <tr>
        <td className="p-[10px] bg-white border-l-[1px] border-y-[1px]">
          {user.firstName}
        </td>
        <td className="p-[10px] bg-white border-y-[1px]">{user.lastName}</td>
        <td className="p-[10px] bg-white border-y-[1px]">{user.email}</td>
        <td className="p-[10px] bg-white border-y-[1px]">
          <button
            className={`p-[5px] w-[150px] text-white rounded-[3px] ${
              user.status ? "bg-[#1f4]" : "bg-[#f00]"
            } `}
          >
            {user.status ? "Đang hoạt động" : "Ngừng hoạt động"}
          </button>
        </td>
        <td className="p-[10px] bg-white border-y-[1px] border-r-[1px]"></td>
      </tr>
    </>
  );
};
export default User;
