import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { TeacherCreateModal } from '../components/Models/Teacher/TeacherCreateModal';
import { TeacherEditModal } from '../components/Models/Teacher/TeacherEditModal';
import { deleteTeacher, getTeachers } from '../http/teacherApi';
import { ITeacher } from '../interfaces/ITeacher';

export const Teachers = () => {
    const [teachers, setTeachers] = useState<ITeacher[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ITeacher>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ITeacher) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getTeachers()
        .then((data) => {
            setTeachers(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteTeacher(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <TeacherCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></TeacherCreateModal>
  
        <TeacherEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></TeacherEditModal>
        <h1>Teachers</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Last name</th>
              <th>Birthday</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hire date</th>
              <th>Department</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.birthday}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.hireDate}</td>
                <td>{teacher.department}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(teacher)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(teacher.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
