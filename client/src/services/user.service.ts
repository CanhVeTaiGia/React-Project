import { createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from 'bcryptjs-react'
import { baseUrl } from "../baseAPI/baseURL";
import { UserType } from "../interface/interface";

export const getAllUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        const response = await baseUrl.get("users");
        return  response.data
    }
);

export const getAdminUser: any = createAsyncThunk(
    "users/getAdminUser",
    async () => {
        const response = await baseUrl.get("users?role_like=ADMIN");
        return response.data;
    }
)


export const currentAdmin: any = createAsyncThunk(
    "users/currentAdmin",
    async (user: UserType) => {
        const response = await baseUrl.get(`users?role_like=ADMIN&_email_like${user.email}&_${bcrypt.hashSync(user.password, 100)}`);
        return response.data
    }
)

export const changeUserStatus: any = createAsyncThunk(
    "users/changeUserStatus",
    async ({ id, status }: { id: number, status: boolean }) => {
        const response = await baseUrl.patch(`/users/${id}`, { status: !status });
        return response.data;
    }
)

export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user: UserType) => {
        const response = await baseUrl.post("users", user);
        return response.data;
    }
)

export const findEmail: any = createAsyncThunk(
    "users/findEmail",
    async (email: string) => {
        const response = await baseUrl.get(`users?_email_like=${email}`);
        return response.data;
    }
)