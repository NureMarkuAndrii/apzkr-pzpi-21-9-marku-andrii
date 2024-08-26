import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { StudentCreateModal } from '../components/Models/Student/StudentCreateModal';
import { StudentEditModal } from '../components/Models/Student/StudentEditModal';
import { deleteStudent, getStudents } from '../http/studentApi';
import { IStudent } from '../interfaces/IStudent';

export const Students = () => {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IStudent>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IStudent) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getStudents()
        .then((data) => {
            setStudents(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteStudent(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <StudentCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></StudentCreateModal>
  
        <StudentEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></StudentEditModal>
        <h1>Students</h1>
  
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
              <th>Enrollment date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.lastName}</td>
                <td>{student.birthday}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.enrollmentDate}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(student)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
