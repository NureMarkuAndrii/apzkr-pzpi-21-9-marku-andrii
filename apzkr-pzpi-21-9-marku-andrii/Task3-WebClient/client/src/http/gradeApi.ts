import { $authhost } from ".";
import { IGradeCreateViewModel } from "../interfaces/ViewModels/CreateViewModels/IGradeCreateViewModel";
import { IGradeEditViewModel } from "../interfaces/ViewModels/EditViewModels/IGradeEditViewModel";

export const getGrades = async () => {
    const { data } = await $authhost.get('api/Grades')
    return data;
}

export const createGrade = async (formData: IGradeCreateViewModel) => {
    const { data } = await $authhost.post('api/Grades', formData)
    return data;
}

export const editGrade = async (id: number, formData: IGradeEditViewModel) => {
    const { data } = await $authhost.put(`api/Grades/${id}`, formData)
    return data;
}

export const deleteGrade = async (id: number) => {
    const { data } = await $authhost.delete(`api/Grades/${id}`)
    return data;
}
