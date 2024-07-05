import store from "../store/store";

export interface HistoryType{
    id: number,
    userId: number,
    date: string,
    point: number,
    examId: number,
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