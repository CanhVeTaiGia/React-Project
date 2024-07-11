import { createSlice } from "@reduxjs/toolkit";
import { QuestType } from "../../interface/interface";
import { addQuest, getAllQuest, updateQuest } from "../../services/quest.service";

const initialState: QuestType[] = [];

const questReducer: any = createSlice({
  name: "quests",
  initialState: {
    quests: initialState,
    editQuest: {
      id: 0,
      question: "",
      examId: 0,
      options: [""],
      answer: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllQuest.fulfilled, (state, action) => {
      state.quests = action.payload;
    })
    .addCase(updateQuest.fulfilled, (state, action) => {
      const index = state.quests.findIndex((item: QuestType) => item.id === action.payload.id);
      state.quests[index] = action.payload;
    //  state.quests.map((item) => item.id === action.payload.id? action.payload : item) 
    })
    .addCase(addQuest.fulfilled, (state, action) => {
      state.quests.push(action.payload);
    })
  },
});
export default questReducer.reducer;