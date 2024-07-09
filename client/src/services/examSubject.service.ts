import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { baseUrl } from "../baseAPI/baseURL";

export const getAllExamSubject: any = createAsyncThunk(
    'examSubjects/getAllExamSubject',
    async () => {
        const res: AxiosResponse = await baseUrl.get('examSubjects');
        return res.data;
    }
)