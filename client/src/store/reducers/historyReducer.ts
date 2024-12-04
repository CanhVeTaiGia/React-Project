import { createSlice } from "@reduxjs/toolkit";
import { HistoryType } from "../../interface/interface";
import { addHistory, getAllHistory, getHistoryById } from "../../services/history.service";
import { getUserHistory } from "../../services/quest.service";

const initialState: HistoryType[] = [];

const historyReducer: any = createSlice({
    name: "histories",
    initialState: {
        histories: initialState,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllHistory.fulfilled, ((state, action) => {
            state.histories = [...action.payload];
        }))
        .addCase(addHistory.fulfilled, (state, action) => {
            state.histories = [...state.histories, action.payload];
        })
        .addCase(getHistoryById.fulfilled, ((state, action) => {
            state.histories = [...action.payload];
        }))
        .addCase(getUserHistory.fulfilled, (state, action) => {
            state.histories = [...action.payload];
        })
        
    }
})
export default historyReducer.reducer;