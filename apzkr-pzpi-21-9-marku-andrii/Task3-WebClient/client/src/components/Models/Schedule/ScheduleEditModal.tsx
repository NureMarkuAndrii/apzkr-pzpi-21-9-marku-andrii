import React, { useState, useEffect, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getCourses } from '../../../http/courseApi';
import { getRooms } from '../../../http/roomApi';
import { editSchedule } from '../../../http/scheduleApi';
import { ICourse } from '../../../interfaces/ICourse';
import { IRoom } from '../../../interfaces/IRoom';
import { ISchedule } from '../../../interfaces/ISchedule';
import { ISelect } from '../../../interfaces/ISelect';
import { IScheduleEditViewModel } from '../../../interfaces/ViewModels/EditViewModels/IScheduleEditViewModel';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ISchedule,
}

export const ScheduleEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IScheduleEditViewModel>();
      const [courses, setCourses] = useState<ICourse[]>([]);
      const [rooms, setRooms] = useState<IRoom[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IScheduleEditViewModel) => {
        await editSchedule(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

      
    const fetchCourses = async () => {
        await getCourses().then((data) => setCourses(data));
    };

    const fetchRooms = async () => {
        await getRooms().then((data) => setRooms(data));
    };

    useEffect(() => {
        fetchCourses();
        fetchRooms();
    }, []);

    const selectCourses = useMemo<ISelect[]>(() => {
        return [
            { value: "0", label: "Select course..." },
            ...courses.map((course) => {
                return {
                    value: course.id.toString(),
                    label: course.name,
                };
            }),
        ];
    }, [courses]);

    const selectRooms = useMemo<ISelect[]>(() => {
        return [
            { value: "0", label: "Select room..." },
            ...rooms.map((room) => {
                return {
                    value: room.id.toString(),
                    label: room.number,
                };
            }),
        ];
    }, [rooms]);

    return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Course</label>
                        <Controller
                            control={control}
                            name={"courseId"}
                            rules={{
                                required: "Select course",
                                validate: (data) => (data != 0 ? undefined : "Select course"),
                            }}
                            render={({ field }) => (
                                <select className="form-control" {...field}>
                                    {selectCourses.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.courseId?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Room</label>
                        <Controller
                            control={control}
                            name={"roomId"}
                            rules={{
                                required: "Select room",
                                validate: (data) => (data != 0 ? undefined : "Select room"),
                            }}
                            render={({ field }) => (
                                <select className="form-control" {...field}>
                                    {selectRooms.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.roomId?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Start Time</label>
                        <Controller
                            control={control}
                            name={"startTime"}
                            rules={{
                                required: "Enter start time",
                            }}
                            render={({ field }) => (
                                <input type="datetime-local" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.startTime?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">End Time</label>
                        <Controller
                            control={control}
                            name={"endTime"}
                            rules={{
                                required: "Enter end time",
                            }}
                            render={({ field }) => (
                                <input type="datetime-local" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.endTime?.message}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
