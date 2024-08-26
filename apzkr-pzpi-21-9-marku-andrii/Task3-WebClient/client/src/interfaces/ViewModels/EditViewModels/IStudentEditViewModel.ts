import { IStudentCreateViewModel } from "../CreateViewModels/IStudentCreateViewModel";

export interface IStudentEditViewModel extends IStudentCreateViewModel {
    id: number,
}