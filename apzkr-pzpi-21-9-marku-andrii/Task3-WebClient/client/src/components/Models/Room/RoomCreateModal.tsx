import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createRoom } from '../../../http/roomApi';
import { IRoomCreateViewModel } from '../../../interfaces/ViewModels/CreateViewModels/IRoomCreateViewModel';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const RoomCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IRoomCreateViewModel>();

    const handleClose = () => {
        reset({});
        onHide();
    };

    const onSubmit = async (data: IRoomCreateViewModel) => {
        await createRoom(data)
            .then(() => {
                handleClose();
                fetch();
            })
            .catch(() => alert("Error"));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Number</label>
                        <Controller
                            control={control}
                            name={"number"}
                            rules={{
                                required: "Enter room number",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.number?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Building</label>
                        <Controller
                            control={control}
                            name={"building"}
                            rules={{
                                required: "Enter building name",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.building?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Capacity</label>
                        <Controller
                            control={control}
                            name={"capacity"}
                            rules={{
                                required: "Enter room capacity",
                                min: {
                                    value: 1,
                                    message: "Minimum capacity is 1"
                                }
                            }}
                            render={({ field }) => (
                                <input type="number" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.capacity?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Type</label>
                        <Controller
                            control={control}
                            name={"type"}
                            rules={{
                                required: "Enter room type",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.type?.message}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};