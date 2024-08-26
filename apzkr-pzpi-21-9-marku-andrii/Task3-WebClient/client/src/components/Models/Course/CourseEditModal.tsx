import React, { useState, useEffect, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editCourse } from '../../../http/courseApi';
import { getTeachers } from '../../../http/teacherApi';
import { ICourse } from '../../../interfaces/ICourse';
import { ISelect } from '../../../interfaces/ISelect';
import { ITeacher } from '../../../interfaces/ITeacher';
import { ICourseEditViewModel } from '../../../interfaces/ViewModels/EditViewModels/ICourseEditViewModel';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ICourse,
}

export const CourseEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ICourseEditViewModel>();
      const [teachers, setTeachers] = useState<ITeacher[]>([]);

    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ICourseEditViewModel) => {
        await editCourse(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

      
    const fetchTeachers = async () => {
        await getTeachers().then((data) => setTeachers(data));
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const selectTeachers = useMemo<ISelect[]>(() => {
        return [
            { value: "0", label: "Select teacher..." },
            ...teachers.map((teacher) => {
                return {
                    value: teacher.id.toString(),
                    label: `${teacher.name} ${teacher.lastName}`,
                };
            }),
        ];
    }, [teachers]);

    return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <Controller
                            control={control}
                            name={"name"}
                            rules={{
                                required: "Enter course name",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.name?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Description</label>
                        <Controller
                            control={control}
                            name={"description"}
                            rules={{
                                required: "Enter course description",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.description?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Credits</label>
                        <Controller
                            control={control}
                            name={"credits"}
                            rules={{
                                required: "Enter number of credits",
                                min: {
                                    value: 1,
                                    message: "Minimum credits is 1"
                                }
                            }}
                            render={({ field }) => (
                                <input type="number" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.credits?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Teacher</label>
                        <Controller 
                            control={control}
                            name={"teacherId"}
                            rules={{
                                required: "Select teacher",
                                validate: (data) => (data != 0 ? undefined : "Select teacher"),
                            }}
                            render={({ field }) => (
                                <select className="form-control" {...field}>
                                    {selectTeachers.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.teacherId?.message}</p>
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
