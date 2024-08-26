import { ICourse } from "./ICourse";
import { IStudent } from "./IStudent";

export interface IGrade {
    id: number,
    student: IStudent,
    studentId: number,
    course: ICourse,
    courseId: number,
    studentGrade: number,
    date: string,
}