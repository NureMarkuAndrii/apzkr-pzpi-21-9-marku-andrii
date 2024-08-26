import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getCourses } from '../../../http/courseApi';
import { createGrade } from '../../../http/gradeApi';
import { getStudents } from '../../../http/studentApi';
import { ICourse } from '../../../interfaces/ICourse';
import { ISelect } from '../../../interfaces/ISelect';
import { IStudent } from '../../../interfaces/IStudent';
import { IGradeCreateViewModel } from '../../../interfaces/ViewModels/CreateViewModels/IGradeCreateViewModel';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const GradeCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IGradeCreateViewModel>();
    const [students, setStudents] = useState<IStudent[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([]);

    const handleClose = () => {
        reset({});
        onHide();
    };

    const onSubmit = async (data: IGradeCreateViewModel) => {
        await createGrade(data)
            .then(() => {
                handleClose();
                fetch();
            })
            .catch(() => alert("Error"));
    };

    const fetchStudents = async () => {
        await getStudents().then((data) => setStudents(data));
    };

    const fetchCourses = async () => {
        await getCourses().then((data) => setCourses(data));
    };

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);

    const selectStudents = useMemo<ISelect[]>(() => {
        return [
            { value: "0", label: "Select student..." },
            ...students.map((student) => {
                return {
                    value: student.id.toString(),
                    label: `${student.name} ${student.lastName}`,
                };
            }),
        ];
    }, [students]);

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

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Grade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Student</label>
                        <Controller
                            control={control}
                            name={"studentId"}
                            rules={{
                                required: "Select student",
                                validate: (data) => (data != 0 ? undefined : "Select student"),
                            }}
                            render={({ field }) => (
                                <select className="form-control" {...field}>
                                    {selectStudents.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.studentId?.message}</p>
                    </div>
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
                        <label className="control-label">Grade</label>
                        <Controller
                            control={control}
                            name={"studentGrade"}
                            rules={{
                                required: "Enter student grade",
                                min: {
                                    value: 0,
                                    message: "Minimum grade is 0"
                                },
                                max: {
                                    value: 100,
                                    message: "Maximum grade is 100"
                                }
                            }}
                            render={({ field }) => (
                                <input type="number" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.studentGrade?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Date</label>
                        <Controller
                            control={control}
                            name={"date"}
                            rules={{
                                required: "Enter date",
                            }}
                            render={({ field }) => (
                                <input type="datetime-local" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.date?.message}</p>
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