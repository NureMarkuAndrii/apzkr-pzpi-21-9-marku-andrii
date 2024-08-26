import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { CourseCreateModal } from '../components/Models/Course/CourseCreateModal';
import { CourseEditModal } from '../components/Models/Course/CourseEditModal';
import { deleteCourse, getCourses } from '../http/courseApi';
import { ICourse } from '../interfaces/ICourse';

export const Courses = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ICourse>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ICourse) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getCourses()
        .then((data) => {
            setCourses(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteCourse(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <CourseCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></CourseCreateModal>
  
        <CourseEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></CourseEditModal>
        <h1>Courses</h1>
  
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
              <th>Description</th>
              <th>Credits</th>
              <th>Teacher email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.credits}</td>
                <td>{course.teacher?.email}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(course)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(course.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
