import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editStudent } from '../../../http/studentApi';
import { IStudent } from '../../../interfaces/IStudent';
import { IStudentEditViewModel } from '../../../interfaces/ViewModels/EditViewModels/IStudentEditViewModel';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IStudent,
}

export const StudentEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IStudentEditViewModel>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IStudentEditViewModel) => {
        await editStudent(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };
    
      return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <Controller
                            control={control}
                            name={"name"}
                            rules={{
                                required: "Enter student name",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.name?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Last Name</label>
                        <Controller
                            control={control}
                            name={"lastName"}
                            rules={{
                                required: "Enter student last name",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.lastName?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Birthday</label>
                        <Controller
                            control={control}
                            name={"birthday"}
                            rules={{
                                required: "Enter student birthday",
                            }}
                            render={({ field }) => (
                                <input type="date" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.birthday?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <Controller
                            control={control}
                            name={"email"}
                            rules={{
                                required: "Enter student email",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address"
                                }
                            }}
                            render={({ field }) => (
                                <input type="email" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Phone</label>
                        <Controller
                            control={control}
                            name={"phone"}
                            rules={{
                                required: "Enter student phone number",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.phone?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Enrollment Date</label>
                        <Controller
                            control={control}
                            name={"enrollmentDate"}
                            rules={{
                                required: "Enter enrollment date",
                            }}
                            render={({ field }) => (
                                <input type="date" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.enrollmentDate?.message}</p>
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
