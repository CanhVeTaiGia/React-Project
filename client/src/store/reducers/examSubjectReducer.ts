import { createSlice } from "@reduxjs/toolkit";
import { ExamSubjectType } from "../../interface/interface";
import { getAllExamSubject } from "../../services/examSubject.service";

const initialState: ExamSubjectType[] = [];

const examSubjectReducer = createSlice({
    name: "examSubjects",
    initialState: {
        examSubjects: initialState,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllExamSubject.fulfilled, (state, action) => {
            state.examSubjects = action.payload;
        })
    }
});
export default examSubjectReducer.reducer;