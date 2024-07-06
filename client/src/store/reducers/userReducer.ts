import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../interface/interface";
import { changeUserStatus, findEmail, getAdminUser, getAllUser } from "../../services/user.service";

interface UsersState {
    users: UserType[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

const userReducer: any = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(getAllUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getAdminUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(changeUserStatus.fulfilled, (state, action) => {
                const existingUser = state.users.find((item) => item.id === action.payload.id);
                if(existingUser){
                    existingUser.status = action.payload.status;
                }
            })
            .addCase(findEmail.fulfilled, (state, action) => {
                state.users = action.payload;
            })
    },
});

export default userReducer.reducer;
