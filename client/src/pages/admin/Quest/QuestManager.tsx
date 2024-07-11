import { useEffect, useState } from "react";
import { QuestHeader } from "../../../components/Header/Header";
import Quest from "./Quest";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuest } from "../../../services/quest.service";
import { QuestType, RootType } from "../../../interface/interface";
import { AddAndEditQuest } from "../../../components/Modal/Modal";

const QuestManager: React.FC = () => {
  const dispatch = useDispatch();

  const { quests }: any = useSelector((state: RootType) => {
    console.log(22222,"duhudhushdsuhd");
    
    return state.quests;
  });

  const [addAndEditModal, setAddAndEditModal] = useState<{
    isOpen: boolean;
    data: QuestType | null;
  }>({
    isOpen: false,
    data: null,
  });

  const hideAddAndEditModal = () => {
    setAddAndEditModal({ isOpen: false, data: null });
  };

  // const questArr = quests ? (Array.isArray(quests) ? quests : [quests]) : [];

  const showAddAndEditModal = (quest: QuestType | null) => {
    setAddAndEditModal({ isOpen: true, data: quest });
  };

  useEffect(() => {
    dispatch(getAllQuest());
  }, []);
  return (
    <>
    {
        addAndEditModal.isOpen && <AddAndEditQuest data={addAndEditModal.data} hideModal={hideAddAndEditModal}/>
    }
      <div className="w-[100%] h-[95vh]">
        <div className="flex flex-col justify-between">
          <QuestHeader showAddAndEditModal={showAddAndEditModal}/>
          <table className="mt-[20px] border-[1px] border-t-[#bbb]">
            <thead>
              <tr>
                <th className="text-center border-b-[1px] p-[10px] w-[1%] border-[#bbb] border-l-[1px]">
                  STT
                </th>
                <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[27%]">
                  Câu hỏi
                </th>
                <th className="text-start border-b-[1px] border-[#bbb]  p-[10px] w-[20%]">
                  Đề thi
                </th>
                <th className="text-start border-b-[1px] border-[#bbb] w-[17%] p-[10px]">
                  Lựa chọn
                </th>
                <th className="text-start border-b-[1px] border-[#bbb] w-[17%] p-[10px]">
                  Câu trả lời
                </th>
                <th className="border-[#bbb] border-b-[1px] w-[9%] border-r-[1px]">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody>
              {quests.map((item: QuestType, index: number) => {
                return (
                  <Quest
                    key={item.id}
                    showAddAndEditModal={showAddAndEditModal}
                    quest={item}
                    index={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuestManager;
