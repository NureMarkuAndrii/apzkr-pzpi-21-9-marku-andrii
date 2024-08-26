import { $authhost } from ".";
import { IStudentCreateViewModel } from "../interfaces/ViewModels/CreateViewModels/IStudentCreateViewModel";
import { IStudentEditViewModel } from "../interfaces/ViewModels/EditViewModels/IStudentEditViewModel";

export const getStudents = async () => {
    const { data } = await $authhost.get('api/Students')
    return data;
}

export const createStudent = async (formData: IStudentCreateViewModel) => {
    const { data } = await $authhost.post('api/Students', formData)
    return data;
}

export const editStudent = async (id: number, formData: IStudentEditViewModel) => {
    const { data } = await $authhost.put(`api/Students/${id}`, formData)
    return data;
}

export const deleteStudent = async (id: number) => {
    const { data } = await $authhost.delete(`api/Students/${id}`)
    return data;
}
