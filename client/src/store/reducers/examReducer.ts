import { createSlice } from "@reduxjs/toolkit";
import { ExamType } from "../../interface/interface";
import { getAllExam } from "../../services/exam.service";

const initialState: ExamType[] = [];

const examReducer: any = createSlice(
    {
        name: "exams",
        initialState: {
            exams: initialState,
            editExam: {
                id: 0,
                title: "",
                description: "",
                examSubject: 0,
            }
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(getAllExam.fulfilled, (state, action) => {
                state.exams = action.payload;
            })
        }
    }
);
export default examReducer.reducer