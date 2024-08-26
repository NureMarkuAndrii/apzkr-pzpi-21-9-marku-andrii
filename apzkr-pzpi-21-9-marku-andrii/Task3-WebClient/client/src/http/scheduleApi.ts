import { $authhost } from ".";
import { IScheduleCreateViewModel } from "../interfaces/ViewModels/CreateViewModels/IScheduleCreateViewModel";
import { IScheduleEditViewModel } from "../interfaces/ViewModels/EditViewModels/IScheduleEditViewModel";

export const getSchedules = async () => {
    const { data } = await $authhost.get('api/Schedules')
    return data;
}

export const createSchedule = async (formData: IScheduleCreateViewModel) => {
    const { data } = await $authhost.post('api/Schedules', formData)
    return data;
}

export const editSchedule = async (id: number, formData: IScheduleEditViewModel) => {
    const { data } = await $authhost.put(`api/Schedules/${id}`, formData)
    return data;
}

export const deleteSchedule = async (id: number) => {
    const { data } = await $authhost.delete(`api/Schedules/${id}`)
    return data;
}
