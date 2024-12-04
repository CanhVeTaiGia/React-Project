import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { baseUrl } from "../baseAPI/baseURL";
import { HistoryType } from "../interface/interface";

export const getAllHistory: any = createAsyncThunk(
    "history/getAllHistory",
    async () => {
        const res: AxiosResponse = await baseUrl.get('histories');
        return res.data
    }
)

export const addHistory: any = createAsyncThunk(
    "history/addHistory",
    async (history: HistoryType) => {
        const res: AxiosResponse = await baseUrl.post('histories', history);
        return res.data;
    }
)

export const getHistoryById: any = createAsyncThunk(
    "history/getHistoryById",
    async (id: number) => {
        const res: AxiosResponse = await baseUrl.get(`histories/${id}`);
        return res.data;
    }
)