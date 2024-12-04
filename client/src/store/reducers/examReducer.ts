import { createSlice } from "@reduxjs/toolkit";
import { ExamType } from "../../interface/interface";
import { addExam, deleteExam, getAllExam, getExamById, updateExam } from "../../services/exam.service";

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
            .addCase(getExamById.fulfilled, (state, action) => {
                state.editExam = action.payload;
            })
            .addCase(updateExam.fulfilled, (state, action) => {
                state.exams.map((item) => item.id === action.payload.id? action.payload : item);
            })
            .addCase(addExam.fulfilled, (state, action) => {
                state.exams.push(action.payload);
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.exams = action.payload;
            })
        }
    }
);
export default examReducer.reducer