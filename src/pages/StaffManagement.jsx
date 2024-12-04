import React, { useState } from "react";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { saveStaffToStorage } from "../utils/storageUtils";

const StaffManagement = ({ staff, setStaff }) => {
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    arrival: "",
    departure: "",
    leave: "",
    floor: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  const openAddModal = () => {
    setNewStaff({
      name: "",
      role: "",
      arrival: "",
      departure: "",
      leave: "",
      floor: "",
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (staffMember) => {
    setNewStaff(staffMember);
    setIsEditing(staffMember.id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (staffMember) => {
    setStaffToDelete(staffMember);
    setIsDeleteModalOpen(true);
  };

  const handleInputChange = (e, field) => {
    setNewStaff((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const validateFields = () => {
    return (
      newStaff.name &&
      newStaff.role &&
      newStaff.arrival &&
      newStaff.departure &&
      newStaff.leave &&
      newStaff.floor
    );
  };

  const handleAddNewStaff = () => {
    if (!validateFields()) {
      alert("All fields are required!");
      return;
    }
    const updatedStaff = [...staff, { ...newStaff, id: Date.now() }];
    setStaff(updatedStaff);
    saveStaffToStorage(updatedStaff);
    setIsAddModalOpen(false);
  };

  const handleSaveStaff = () => {
    if (!validateFields()) {
      alert("All fields are required!");
      return;
    }
    const updatedStaff = staff.map((member) =>
      member.id === isEditing ? { ...member, ...newStaff } : member
    );
    setStaff(updatedStaff);
    saveStaffToStorage(updatedStaff);
    setIsEditing(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteStaff = () => {
    const updatedStaff = staff.filter((member) => member.id !== staffToDelete.id);
    setStaff(updatedStaff);
    saveStaffToStorage(updatedStaff);
    setStaffToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="staff-management">
      <div className="staff-header">
        <h1>Staff Management</h1>
        <button onClick={openAddModal} className="add-btn">
          Add Staff
        </button>
      </div>
      <div className="staff-cards-container">
        {staff.map((member) => (
          <div key={member.id} className="staff-card">
            <div className="staff-card-header">
              <h2 className="staff-name">{member.name}</h2>
              <div className="action-button">
                <div onClick={() => openEditModal(member)} className="edit-btn">
                  <FiEdit />
                </div>
                <div onClick={() => openDeleteModal(member)} className="delete-btn">
                  <RiDeleteBin4Line />
                </div>
              </div>
            </div>
            <p className="staff-role">Role: {member.designation}</p>
            <p className="staff-arrival">Arrival: {member.arrival}</p>
            <p className="staff-departure">Departure: {member.departure}</p>
            <p className="staff-leave">On Leave: {member.leave}</p>
            <p className="staff-floor">Assigned Floor: {member.floor}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2>Add New Staff</h2>
        <div className="add-staff-form">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={newStaff.name}
            onChange={(e) => handleInputChange(e, "name")}
            label="Name"
          />
          <Input
            type="text"
            name="role"
            placeholder="Role"
            value={newStaff.role}
            onChange={(e) => handleInputChange(e, "role")}
            label="Role"
          />
          <Input
            type="text"
            name="arrival"
            placeholder="Arrival"
            value={newStaff.arrival}
            onChange={(e) => handleInputChange(e, "arrival")}
            label="Arrival"
          />
          <Input
            type="text"
            name="departure"
            placeholder="Departure"
            value={newStaff.departure}
            onChange={(e) => handleInputChange(e, "departure")}
            label="Departure"
          />
          <Input
            type="text"
            name="leave"
            placeholder="Leave"
            value={newStaff.leave}
            onChange={(e) => handleInputChange(e, "leave")}
            label="Leave"
          />
          <Input
            type="text"
            name="floor"
            placeholder="Floor"
            value={newStaff.floor}
            onChange={(e) => handleInputChange(e, "floor")}
            label="Floor"
          />
          <button onClick={handleAddNewStaff} className="save-btn">
            Add Staff
          </button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2>Edit Staff</h2>
        <div className="edit-staff-form">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={newStaff.name}
            onChange={(e) => handleInputChange(e, "name")}
            label="Name"
          />
          <Input
            type="text"
            name="role"
            placeholder="Role"
            value={newStaff.role}
            onChange={(e) => handleInputChange(e, "role")}
            label="Role"
          />
          <Input
            type="text"
            name="arrival"
            placeholder="Arrival"
            value={newStaff.arrival}
            onChange={(e) => handleInputChange(e, "arrival")}
            label="Arrival"
          />
          <Input
            type="text"
            name="departure"
            placeholder="Departure"
            value={newStaff.departure}
            onChange={(e) => handleInputChange(e, "departure")}
            label="Departure"
          />
          <Input
            type="text"
            name="leave"
            placeholder="Leave"
            value={newStaff.leave}
            onChange={(e) => handleInputChange(e, "leave")}
            label="Leave"
          />
          <Input
            type="text"
            name="floor"
            placeholder="Floor"
            value={newStaff.floor}
            onChange={(e) => handleInputChange(e, "floor")}
            label="Floor"
          />
          <button onClick={handleSaveStaff} className="save-btn">
            Save Changes
          </button>
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="confirm-delete-modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this family?</p>
          <div className="confirm-delete-actions">
          <button onClick={handleDeleteStaff} className="confirm-btn">
            Yes, Delete
          </button>
          <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-btn">
            Cancel
          </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StaffManagement;
