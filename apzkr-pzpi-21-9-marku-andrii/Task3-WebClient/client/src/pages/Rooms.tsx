import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { RoomCreateModal } from '../components/Models/Room/RoomCreateModal';
import { RoomEditModal } from '../components/Models/Room/RoomEditModal';
import { deleteRoom, getRooms } from '../http/roomApi';
import { IRoom } from '../interfaces/IRoom';

export const Rooms = () => {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IRoom>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IRoom) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getRooms()
        .then((data) => {
            setRooms(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteRoom(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <RoomCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></RoomCreateModal>
  
        <RoomEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></RoomEditModal>
        <h1>Rooms</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Number</th>
              <th>Building</th>
              <th>Capacity</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.number}</td>
                <td>{room.building}</td>
                <td>{room.capacity}</td>
                <td>{room.type}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(room)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(room.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
