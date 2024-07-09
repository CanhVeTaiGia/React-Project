import store from "../store/store";

export interface HistoryType{
    id: number,
    userId: number,
    date: string,
    point: number,
    examId: number,
}

export interface CourseType{
    id: number,
    title: string,
    description: string,
}

export interface ExamType{
    id: number,
    title: string,
    description: string,
    duration: number,
    examSubjectId: number
}

export interface UserAnswerType{
    id: number,
    userId: number,
    exampId: number,
    score: number
}

export interface UserType{
    id: number,
    name: string,
    image?: string,
    email: string,
    password: string,
    role: "USER" | "ADMIN",
    status: boolean
}

export interface Warning{
    name?: boolean,
    email: boolean,
    password: boolean,
}

export type RootType = ReturnType<typeof store.getState>


export interface CourseWarning{
    title: boolean,
    description: boolean
}