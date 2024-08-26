import { $authhost } from ".";
import { IRoomCreateViewModel } from "../interfaces/ViewModels/CreateViewModels/IRoomCreateViewModel";
import { IRoomEditViewModel } from "../interfaces/ViewModels/EditViewModels/IRoomEditViewModel";

export const getRooms = async () => {
    const { data } = await $authhost.get('api/Rooms')
    return data;
}

export const createRoom = async (formData: IRoomCreateViewModel) => {
    const { data } = await $authhost.post('api/Rooms', formData)
    return data;
}

export const editRoom = async (id: number, formData: IRoomEditViewModel) => {
    const { data } = await $authhost.put(`api/Rooms/${id}`, formData)
    return data;
}

export const deleteRoom = async (id: number) => {
    const { data } = await $authhost.delete(`api/Rooms/${id}`)
    return data;
}
