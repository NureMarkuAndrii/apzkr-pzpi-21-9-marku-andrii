import { ICourse } from "./ICourse";
import { IRoom } from "./IRoom";

export interface ISchedule {
    id: number,
    course: ICourse,
    courseId: number,
    room: IRoom,
    roomId: number,
    startTime: string,
    endTime: string
}