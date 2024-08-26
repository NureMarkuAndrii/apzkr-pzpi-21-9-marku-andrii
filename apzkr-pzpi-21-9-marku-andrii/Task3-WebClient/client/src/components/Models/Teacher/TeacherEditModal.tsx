import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editTeacher } from '../../../http/teacherApi';
import { ITeacher } from '../../../interfaces/ITeacher';
import { ITeacherEditViewModel } from '../../../interfaces/ViewModels/EditViewModels/ITeacherEditViewModel';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ITeacher,
}

export const TeacherEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ITeacherEditViewModel>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ITeacherEditViewModel) => {
        await editTeacher(data.id, data)
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
                    <Modal.Title>Edit Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <Controller
                            control={control}
                            name={"name"}
                            rules={{
                                required: "Enter teacher name",
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
                                required: "Enter teacher last name",
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
                                required: "Enter teacher birthday",
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
                                required: "Enter teacher email",
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
                                required: "Enter teacher phone number",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.phone?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Hire Date</label>
                        <Controller
                            control={control}
                            name={"hireDate"}
                            rules={{
                                required: "Enter hire date",
                            }}
                            render={({ field }) => (
                                <input type="date" className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.hireDate?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Department</label>
                        <Controller
                            control={control}
                            name={"department"}
                            rules={{
                                required: "Enter department",
                            }}
                            render={({ field }) => (
                                <input className="form-control" {...field} />
                            )}
                        ></Controller>
                        <p style={{ color: "red" }}>{errors.department?.message}</p>
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
