import { $authhost } from ".";
import { ITeacherCreateViewModel } from "../interfaces/ViewModels/CreateViewModels/ITeacherCreateViewModel";
import { ITeacherEditViewModel } from "../interfaces/ViewModels/EditViewModels/ITeacherEditViewModel";

export const getTeachers = async () => {
    const { data } = await $authhost.get('api/Teachers')
    return data;
}

export const createTeacher = async (formData: ITeacherCreateViewModel) => {
    const { data } = await $authhost.post('api/Teachers', formData)
    return data;
}

export const editTeacher = async (id: number, formData: ITeacherEditViewModel) => {
    const { data } = await $authhost.put(`api/Teachers/${id}`, formData)
    return data;
}

export const deleteTeacher = async (id: number) => {
    const { data } = await $authhost.delete(`api/Teachers/${id}`)
    return data;
}
