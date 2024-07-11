import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { baseUrl } from "../baseAPI/baseURL";
import { ExamType } from "../interface/interface";

export const getAllExam: any = createAsyncThunk(
    'exams/getAllExam',
    async () => {
        const res: AxiosResponse = await baseUrl.get('exams');
        return res.data
    }
)

export const getExamById: any = createAsyncThunk(
    'exams/getExamById',
    async (id: number) => {
        const res: AxiosResponse = await baseUrl.get(`exams/${id}`)
        return res.data;
    }
)

export const updateExam: any = createAsyncThunk(
    'exams/updateExam',
    async (exam: ExamType) => {
        const res: AxiosResponse = await baseUrl.put(`exams/${exam.id}`, exam);
        return res.data;
    }
)

export const addExam: any = createAsyncThunk(
    'exams/addExam',
    async (exam: ExamType) => {
        const res: AxiosResponse = await baseUrl.post('exams', exam);
        return res.data;
    }
)

export const deleteExam: any = createAsyncThunk(
    'exams/deleteExam',
    async (id: number) => {
        await baseUrl.delete(`exams/${id}`);
        const res: AxiosResponse = await baseUrl.get('exams');
        return res.data;
    }
)