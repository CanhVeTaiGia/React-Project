import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../interface/interface";
import { addUser, changeUserStatus, findEmail, getAdminUser, getAdminUserById, getAllUser, getUserById, searchUser, sortUser, updateUser,} from "../../services/user.service";
import { deleteQuest } from "../../services/quest.service";



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
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(sortUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.users = action.payload
            })
            
    },
});

export default userReducer.reducer;
