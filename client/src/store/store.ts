import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import courseReducer from "./reducers/courseReducer";
import examSubjectReducer from "./reducers/examSubjectReducer";
import examReducer from "./reducers/examReducer";

const store = configureStore({
    reducer: 
    {
        users: userReducer,
        courses: courseReducer,
        examSubjects: examSubjectReducer,
        exams: examReducer
    }
})
export default store;