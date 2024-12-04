import { createSlice } from "@reduxjs/toolkit";
import { ExamSubjectType } from "../../interface/interface";
import { addExamSubject, deleteExamSubject, getAllExamSubject, getExamSubjectById, updateExamSubject } from "../../services/examSubject.service";

const initialState: ExamSubjectType[] = [];

const examSubjectReducer: any = createSlice({
    name: "examSubjects",
    initialState: {
        examSubjects: initialState,
        editSubject: {
            id: 0,
            title: "",
            description: "",
            courseId: 0
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllExamSubject.fulfilled, (state, action) => {
            state.examSubjects = action.payload;
        })
        .addCase(addExamSubject.fulfilled, (state, action) => {
            state.examSubjects.push(action.payload);
        })
        .addCase(updateExamSubject.fulfilled, (state, action) => {
            let findIndex= state.examSubjects.findIndex((item) => {
                return item.id === action.payload.id;
            });
            state.examSubjects[0] = action.payload;
            
        })
        .addCase(deleteExamSubject.fulfilled, (state, action) => {
            state.examSubjects = action.payload;
        })
        .addCase(getExamSubjectById.fulfilled, (state, action) => {
            state.editSubject = action.payload;
        })
    }
});
export default examSubjectReducer.reducer;