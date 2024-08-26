import { $authhost } from ".";
import { ICourseCreateViewModel } from "../interfaces/ViewModels/CreateViewModels/ICourseCreateViewModel";
import { ICourseEditViewModel } from "../interfaces/ViewModels/EditViewModels/ICourseEditViewModel";

export const getCourses = async () => {
    const { data } = await $authhost.get('api/Courses')
    return data;
}

export const createCourse = async (formData: ICourseCreateViewModel) => {
    const { data } = await $authhost.post('api/Courses', formData)
    return data;
}

export const editCourse = async (id: number, formData: ICourseEditViewModel) => {
    const { data } = await $authhost.put(`api/Courses/${id}`, formData)
    return data;
}

export const deleteCourse = async (id: number) => {
    const { data } = await $authhost.delete(`api/Courses/${id}`)
    return data;
}
