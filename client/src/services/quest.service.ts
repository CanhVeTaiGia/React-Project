import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { baseUrl } from "../baseAPI/baseURL";
import { QuestType } from "../interface/interface";

export const getAllQuest: any = createAsyncThunk(
    'quests/getAllQuest',
    async () => {
        const res: AxiosResponse = await baseUrl.get('quests');
        return res.data;
    }
)

export const addQuest: any = createAsyncThunk(
    'quests/addQuest',
    async (quest: QuestType) => {
        const res: AxiosResponse = await baseUrl.post('quests', quest);
        return res.data;
    }
)

export const updateQuest: any = createAsyncThunk(
    'quests/updateQuest',
    async (quest: QuestType) => {
        const res: AxiosResponse = await baseUrl.put(`quests/${quest.id}`, quest);
        return res.data;
    }
)

export const deleteQuest: any = createAsyncThunk(
    'quests/deleteQuest',
    async (id: number) => {
        await baseUrl.delete(`quests/${id}`);
        const res: AxiosResponse = await baseUrl.get('quests');
        return res.data;
    }
)

export const getUserHistory: any = createAsyncThunk(
    'quests/getUserHistory',
    async (id: number) => {
        const res: AxiosResponse = await baseUrl.get(`histories?userId=${id}`);
        return res.data
    }
)