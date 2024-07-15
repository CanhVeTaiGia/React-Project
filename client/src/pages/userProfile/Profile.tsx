import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getUserById, updateUser } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { RootType, UserType } from "../../interface/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

export const Profile = () => {
  const { users }: any = useSelector((state: RootType) => {
    return state.users;
  });

  const [image, setImage] = useState<any>({
    file: null,
    name: null,
    url: null,
  });

  const [userId, setUserId] = useState<number>(() => {
    const token = localStorage.getItem("userId");
    return token ? Number(JSON.parse(token)) : 0;
  });

  const dispatch = useDispatch();

  const getUser: UserType = Array.isArray(users) ? null : users;

  const [user, setUser] = useState<UserType>({
    id: 0,
    name: "",
    email: "",
    password: "",
    status: true,
    role: "USER",
  });

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  // console.log(getUser);
  // console.log(user);

  const resetImage = () => {
    setImage({ ...image, file: null, name: null, url: null });
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const valImg: File | undefined = e.target.files?.[0];
    if (valImg) {
      const imageUrl = URL.createObjectURL(valImg);
      setImage({ file: valImg, name: valImg.name, url: imageUrl });
      const imgRef = ref(storage, `profile/${valImg.name}`);
      await uploadBytes(imgRef, valImg);
      const downloadUrl = await getDownloadURL(imgRef);
      setImage({ file: valImg, name: valImg.name, url: downloadUrl });
      URL.revokeObjectURL(imageUrl);
    }
  };

  const updateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = {
      ...getUser,
      name: user.name,
      image: image.url,
    };   
    
    dispatch(updateUser(updatedUser));
    resetImage();
    setUser({
      id: 0,
      name: "",
      email: "",
      password: "",
      status: true,
      role: "USER",
    });
  };

  useEffect(() => {
    dispatch(getUserById(userId));
  }, []);
  return (
    <div className="w-[100%] h-[100%] p-[20px] text-white flex justify-center items-center bg-[#333] text-[#red]">
      <div className="w-[95%] h-[95%] p-[30px] font-[600] rounded-[10px] bg-[#222]">
        <h2 className="text-[32px] mb-[20px] text-white">Chỉnh sửa hồ sơ</h2>
        <div className="w-[100%] flex justify-around">
          <form
            onSubmit={updateProfile}
            className="w-[300px] flex gap-[30px] mt-[50px] flex-col items-center"
          >
            <h2>Ảnh đại diện</h2>
            {image.url ? (
              <img
                className="w-[120px] h-[120px] rounded-[50%]"
                src={image.url}
              />
            ) : getUser && getUser.image ? (
              <img
                className="w-[120px] h-[120px] rounded-[50%]"
                src={getUser.image}
              />
            ) : (
              <FontAwesomeIcon className="text-[120px]" icon={faCircleUser} />
            )}
            <input
              onChange={handleUploadImage}
              id="file"
              type="file"
              className="hidden"
            />
            <label
              htmlFor="file"
              className="w-[100px] cursor-pointer transition-all duration-300 justify-center items-center inline-flex gap-[10px] h-[40px] text-[14px] hover:border-[#f00] hover:text-[#f00] border-[#fff] border-[1px] rounded-[5px]"
            >
              <FontAwesomeIcon icon={faCloudArrowUp} />
              Đổi ảnh
            </label>
            <input
              onChange={handleChangeName}
              className="bg-[#00000000] border-[1px] rounded-[5px] py-[3px] pl-[10px]"
              type="text"
              placeholder="Tên"
            />
            <button className="px-[30px] py-[3px] border-[1px] rounded-[8px] border-[#f00]">
              Lưu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
