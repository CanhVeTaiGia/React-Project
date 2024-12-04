import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import courseReducer from "./reducers/courseReducer";
import examSubjectReducer from "./reducers/examSubjectReducer";
import examReducer from "./reducers/examReducer";
import questReducer from "./reducers/questReducer";
import historyReducer from "./reducers/historyReducer";

const store = configureStore({
    reducer: 
    {
        users: userReducer,
        courses: courseReducer,
        examSubjects: examSubjectReducer,
        exams: examReducer,
        quests: questReducer,
        histories: historyReducer
    }
})
export default store;