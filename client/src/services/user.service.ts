import { createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from 'bcryptjs-react'
import { baseUrl } from "../baseAPI/baseURL";
import { UserType } from "../interface/interface";
import { Axios, AxiosResponse } from "axios";

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

export const getUserById: any = createAsyncThunk(
    "users/getUserById",
    async (id: number) => {
        const response = await baseUrl.get(`users/${id}`);
        return response.data;
    }
)

export const getAdminUserById: any = createAsyncThunk(
    "users/getAdminUserById",
    async (id: number) => {
        const response = await baseUrl.get(`users/${id}`);
        return response.data;
    }
)


export const sortUser: any = createAsyncThunk(
    "user/sortUser",
    async ({ order, field }: { order: string; field: string }) => {
      const response: AxiosResponse = await baseUrl.get(`users?_sort=${field}&_order=${order}`);
      return response.data;
    }
  );

  export const searchUser: any = createAsyncThunk(
    'users/searchUser',
    async (search: string) => {
        const response: AxiosResponse = await baseUrl.get(`users?name_like=${search}`);
        return response.data;
    }
  );

export const updateUser: any = createAsyncThunk(
    'users/updateUserById',
    async (user: UserType) => {
        const response: AxiosResponse = await baseUrl.put(`users/${user.id}`, user);
        return response.data;
    }
)