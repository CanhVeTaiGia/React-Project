import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../interface/interface";
import { getAdminUser, getAllUser } from "../../services/user.service";

const initialState: UserType[] = [];

const userReducer = createSlice({
    name: "users",
    initialState: {
        users: initialState
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllUser.pending, () => {
            console.log("...loading");
            
        })
        .addCase(getAllUser.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(getAllUser.rejected, (err) => {
            throw err
        })
        .addCase(getAdminUser.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
});
export default userReducer.reducer;