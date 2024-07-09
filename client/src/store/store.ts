import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import courseReducer from "./reducers/courseReducer";
import examSubjectReducer from "./reducers/examSubjectReducer";

const store = configureStore({
    reducer: 
    {
        users: userReducer,
        courses: courseReducer,
        examSubjects: examSubjectReducer
    }
})
export default store;