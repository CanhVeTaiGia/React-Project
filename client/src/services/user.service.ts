import { createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from 'bcryptjs-react'
import axios from "axios";
import { baseUrl } from "../baseAPI/baseURL";
import { UserType } from "../interface/interface";

export const getAllUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        const response = await baseUrl.get("users");
        return (await response).data
    }
);

export const getAdminUser: any = createAsyncThunk(
    "users/getAdminUser",
    async () => {
        const response = await baseUrl.get("users?role_like=ADMIN");
        return (await response).data;
    }
)


export const currentAdmin: any = createAsyncThunk(
    "users/currentAdmin",
    async (user: UserType) => {
        const response = await baseUrl.get(`users?role_like=ADMIN&_email_like${user.email}&_${bcrypt.hashSync(user.password, 100)}`);
        return (await response).data
    }
)