import store from "../store/store";

export interface HistoryType{
    id: number,
    userId: number,
    date: string,
    point: number,
    examId: number,
}

export interface Course{
    id: number,
    title: string,
    description: string,
}

export interface Exam{
    id: number,
    title: string,
    description: string,
    duration: number,
    examSubjectId: number
}

export interface UserAnswer{
    id: number,
    userId: number,
    exampId: number,
    score: number
}

export interface UserType{
    id: number,
    firstName: string,
    lastName: string,
    image?: string,
    email: string,
    password: string,
    role: "USER" | "ADMIN",
    status: boolean
}

export interface Warning{
    firstName?: boolean,
    lastName?: boolean,
    email: boolean,
    password: boolean,
}

export type RootType = ReturnType<typeof store.getState>