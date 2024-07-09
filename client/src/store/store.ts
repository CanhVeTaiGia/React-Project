import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import courseReducer from "./reducers/courseReducer";

const store = configureStore({
    reducer: 
    {
        users: userReducer,
        courses: courseReducer
    }
})
export default store;