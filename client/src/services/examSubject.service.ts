import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { baseUrl } from "../baseAPI/baseURL";
import { ExamSubjectType } from "../interface/interface";

export const getAllExamSubject: any = createAsyncThunk(
    'examSubjects/getAllExamSubject',
    async () => {
        const res: AxiosResponse = await baseUrl.get('examSubjects');
        return res.data;
    }
)

export const addExamSubject: any = createAsyncThunk(
    'examSubjects/addExamSubject',
    async (examSubject: ExamSubjectType) => {
        const res: AxiosResponse = await baseUrl.post('examSubjects', examSubject);
        return res.data;
    }
)

export const updateExamSubject: any = createAsyncThunk(
    'examSubjects/updateExamSubject',
    async (examSubject: ExamSubjectType) => {
        const res: AxiosResponse = await baseUrl.patch(`examSubjects/${examSubject.id}`, examSubject);
        return res.data;
    }
)

export const deleteExamSubject: any = createAsyncThunk(
    'examSubjects/deleteExamSubject',
    async (id: number) => {
        await baseUrl.delete(`examSubjects/${id}`)
        const res: AxiosResponse = await baseUrl.get(`examSubjects`);
        return res.data;
    }
)

export const getExamSubjectById: any = createAsyncThunk(
    'examSubjects/getExamSubjectById',
    async (id: number) => {
        const res: AxiosResponse = await baseUrl.get(`examSubjects/${id}`);
        return res.data;
    }
)