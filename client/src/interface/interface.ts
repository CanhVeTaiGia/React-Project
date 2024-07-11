import store from "../store/store";


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

export interface ExamSubjectType{
    id: number,
    title: string,
    description: string,
    courseId: number
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

export interface UserAnswerType{
    id: number,
    userId: number,
    exampId: number,
    score: number
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

export interface QuestType{
    id: number,
    question: string,
    examId: number,
    options: string[],
    answer: string
}