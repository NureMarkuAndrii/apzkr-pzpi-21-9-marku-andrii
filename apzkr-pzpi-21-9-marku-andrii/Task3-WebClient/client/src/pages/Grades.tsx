import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { GradeCreateModal } from '../components/Models/Grade/GradeCreateModa';
import { GradeEditModal } from '../components/Models/Grade/GradeEditModal';
import { deleteGrade, getGrades } from '../http/gradeApi';
import { IGrade } from '../interfaces/IGrade';

export const Grades = () => {
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IGrade>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IGrade) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getGrades()
        .then((data) => {
            setGrades(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteGrade(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <GradeCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></GradeCreateModal>
  
        <GradeEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></GradeEditModal>
        <h1>Grades</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Student email</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.id}</td>
                <td>{grade.student?.email}</td>
                <td>{grade.course?.name}</td>
                <td>{grade.studentGrade}</td>
                <td>{grade.date}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(grade)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(grade.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
