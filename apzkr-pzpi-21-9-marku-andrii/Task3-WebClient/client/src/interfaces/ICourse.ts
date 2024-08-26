import { ITeacher } from "./ITeacher";

export interface ICourse {
    id: number,
    name: string,
    description: string,
    credits: number,
    teacher: ITeacher,
    teacherId: number,
}