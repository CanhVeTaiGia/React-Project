import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../baseAPI/baseURL";
import { CourseType } from "../interface/interface";

export const getAllCourse: any = createAsyncThunk(
    "courses/getAllCourse",
    async () => {
        const response = await baseUrl.get('courses');
        return response.data;
    }
)

export const deleteCourse: any = createAsyncThunk(
    "courses/deleteCourse",
    async (id: any) => {
        await baseUrl.delete(`courses/${id}`);
        const response = await baseUrl.get('courses');
        return response.data;
    }
)

export const getCourseById: any = createAsyncThunk(
    'courses/getCourseById',
    async (id: any) => {
        const response = await baseUrl.get(`courses/${id}`);
        return response.data
    }
)

export const addCourse: any = createAsyncThunk(
    'courses/addCourse',
    async (data: CourseType) => {
        const response = await baseUrl.post('courses', data);
        return response.data;
    }
)

export const editCourse: any = createAsyncThunk(
    'courses/editCourse',
    async (data: CourseType) => {
        const response = await baseUrl.patch(`courses/${data.id}`, data);
        return response.data;
    }
)