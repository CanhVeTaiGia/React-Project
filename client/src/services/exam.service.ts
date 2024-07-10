import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { baseUrl } from "../baseAPI/baseURL";

export const getAllExam: any = createAsyncThunk(
    'exams/getAllExam',
    async () => {
        const res: AxiosResponse = await baseUrl.get('exams');
        return res.data
    }
)