import { useDispatch, useSelector } from "react-redux";
import { UserManagerHeader } from "../Header/Header";
import User from "./User";
import { RootType, UserType } from "../../interface/interface";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/user.service";
import { AddAndEditUser } from "../Modal/Modal";

const UserManager: React.FC = () => {
  const data: any = useSelector((state: RootType) => {
    return state.users;
  });
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeShowModal, setTypeShowModal] = useState<"EDIT" | "ADD">("ADD");

  const changeModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  return (
    <>
      {showModal ? (
        <AddAndEditUser
          typeShowModal={typeShowModal}
          showModal={showModal}
          changeModal={changeModal}
        />
      ) : (
        ""
      )}
      <UserManagerHeader
        showModal={showModal}
        changeModal={changeModal}
        typeShowModal="ADD"
      />
      <table className="mt-[20px] w-[100%] table-fixed">
        <thead>
          <tr>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] border-l-[#ccc] text-start">
              Tên
            </th>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] text-start">
              Email
            </th>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] text-start">
              Trạng thái
            </th>
            <th className="border-[1px] p-[10px] bg-[#aaaaaa11] border-y-[#ccc] border-r-[#ccc]">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user: UserType) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default UserManager;
