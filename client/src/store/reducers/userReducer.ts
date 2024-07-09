import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../interface/interface";
import { changeUserStatus, findEmail, getAdminUser, getAdminUserById, getAllUser, getUserById } from "../../services/user.service";



const initialState: UserType[] = [];

const userReducer: any = createSlice({
    name: "users",
    initialState: {
        users: initialState,
        adminProfile: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getAdminUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(changeUserStatus.fulfilled, (state, action) => {
                const existingUser = state.users.find((item: UserType) => item.id === action.payload.id);
                if(existingUser){
                    existingUser.status = action.payload.status;
                }
            })
            .addCase(findEmail.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getAdminUserById.fulfilled, (state, action) => {
                state.adminProfile = action.payload;
            })
    },
});

export default userReducer.reducer;
