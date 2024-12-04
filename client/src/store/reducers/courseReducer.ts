import { createSlice } from "@reduxjs/toolkit";
import { CourseType } from "../../interface/interface";
import { addCourse, deleteCourse, editCourse, getAllCourse, getCourseById } from "../../services/course.service";

const initialState: CourseType[] = [];

const courseReducer: any = createSlice({
    name: "courses",
    initialState: {
        courses: initialState,
        editCourse: {
            id: 0,
            title: "",
            description: "",
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCourse.fulfilled, (state, action) => {
            state.courses = action.payload
        })
        .addCase(deleteCourse.fulfilled, (state, action) => {
            state.courses = action.payload
        })
        .addCase(getCourseById.fulfilled, (state, action) => {
            state.editCourse = action.payload
        })
        .addCase(addCourse.fulfilled, (state, action) => {
            state.courses.push(action.payload);
        })
        .addCase(editCourse.fulfilled, (state, action) => {
            state.courses = state.courses.map((course: CourseType) => course.id === action.payload.id ? action.payload : course)
        })
    }
});
export default courseReducer.reducer;