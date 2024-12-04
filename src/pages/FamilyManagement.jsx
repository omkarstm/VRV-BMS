import React, { useState, useEffect } from 'react';
import { getUsersFromStorage, saveUsersToStorage } from '../utils/storageUtils';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Dropdown from '../components/ui/Dropdown';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";

const FamilyManagement = () => {
  const [families, setFamilies] = useState([]);
  const [newFamily, setNewFamily] = useState({
    name: '',
    members: '',
    rentingDate: '',
    floor: '',
    maritalStatus: '',
  });
  const [editingFamily, setEditingFamily] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [familyToDelete, setFamilyToDelete] = useState(null);

  const maritalStatusOptions = ['Bachelor', 'Married'];

  useEffect(() => {

    const allUsers = getUsersFromStorage();
    const familyUsers = allUsers
      .filter((user) => user.role === 'Family')
      .map((user) => ({
        ...user,
        members: user.members || Math.floor(Math.random() * 6) + 1, 
        rentingDate: user.rentingDate || `2023-0${(user.id % 12) + 1}-01`, 
        floor: user.floor || (user.id % 5) + 1, 
        maritalStatus: user.maritalStatus || (user.id % 2 === 0 ? 'Married' : 'Bachelor'), 
      }));
    setFamilies(familyUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFamily((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusSelect = (status) => {
    setNewFamily((prev) => ({ ...prev, maritalStatus: status }));
  };

  const openAddFamilyModal = () => {
    setEditingFamily(null);
    setNewFamily({
      name: '',
      members: '',
      rentingDate: '',
      floor: '',
      maritalStatus: '',
    });
    setIsModalOpen(true);
  };

  const addFamily = () => {
    if (
      !newFamily.name ||
      !newFamily.members ||
      !newFamily.rentingDate ||
      !newFamily.floor ||
      !newFamily.maritalStatus
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const newFamilyData = { id: Date.now(), ...newFamily, role: 'Family' };
    const updatedFamilies = [...families, newFamilyData];
    setFamilies(updatedFamilies);


    const allUsers = getUsersFromStorage();
    saveUsersToStorage([...allUsers, newFamilyData]);

    setNewFamily({
      name: '',
      members: '',
      rentingDate: '',
      floor: '',
      maritalStatus: '',
    });
    setIsModalOpen(false);
  };

  const editFamily = (family) => {
    setEditingFamily(family.id);
    setNewFamily({ ...family });
    setIsModalOpen(true);
  };

  const saveFamily = () => {
    const updatedFamilies = families.map((family) =>
      family.id === editingFamily ? { ...family, ...newFamily } : family
    );
    setFamilies(updatedFamilies);


    const allUsers = getUsersFromStorage();
    const updatedUsers = allUsers.map((user) =>
      user.id === editingFamily ? { ...user, ...newFamily } : user
    );
    saveUsersToStorage(updatedUsers);

    setEditingFamily(null);
    setNewFamily({
      name: '',
      members: '',
      rentingDate: '',
      floor: '',
      maritalStatus: '',
    });
    setIsModalOpen(false);
  };

  const deleteFamily = (id) => {
    const updatedFamilies = families.filter((family) => family.id !== id);
    setFamilies(updatedFamilies);

    const allUsers = getUsersFromStorage();
    const updatedUsers = allUsers.filter((user) => user.id !== id);
    saveUsersToStorage(updatedUsers);

    setIsConfirmModalOpen(false);
    setFamilyToDelete(null);
  };

  const openDeleteConfirmation = (family) => {
    setFamilyToDelete(family);
    setIsConfirmModalOpen(true);
  };

  const cancelDelete = () => {
    setIsConfirmModalOpen(false);
    setFamilyToDelete(null);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'members', label: 'Number of Members' },
    { key: 'rentingDate', label: 'Date of Renting' },
    { key: 'floor', label: 'Floor Number' },
    { key: 'maritalStatus', label: 'Marital Status' },
  ];

  const actions = [
    {
      label: <FiEdit />,
      callback: editFamily,
      className: 'edit-btn',
    },
    {
      label: <RiDeleteBin4Line />,
      callback: openDeleteConfirmation,
      className: 'delete-btn',
    },
  ];


  return (
    <div className="family-management">
      <div className="family-header">
        <h1>Family Management</h1>
        <button onClick={openAddFamilyModal} className="add-btn">
          Add Family
        </button>
      </div>
      <Table data={families} columns={columns} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="add-family-form">
          <h2>{editingFamily ? 'Edit Family' : 'Add Family'}</h2>
          <Input
            type="text"
            name="name"
            placeholder="Head of Family Name"
            value={newFamily.name}
            onChange={handleInputChange}
            label="Name"
          />
          <Input
            type="number"
            name="members"
            placeholder="Number of Members"
            value={newFamily.members}
            onChange={handleInputChange}
            label="Number of Members"
          />
          <Input
            type="date"
            name="rentingDate"
            placeholder="Date of Renting"
            value={newFamily.rentingDate}
            onChange={handleInputChange}
            label="Date of Renting"
          />
          <Input
            type="number"
            name="floor"
            placeholder="Floor Number"
            value={newFamily.floor}
            onChange={handleInputChange}
            label="Floor Number"
          />
          <Dropdown
            options={maritalStatusOptions}
            selected={newFamily.maritalStatus}
            onSelect={handleStatusSelect}
            placeholder="Select Marital Status"
          />
          {editingFamily ? (
            <button onClick={saveFamily} className="save-btn" type="button">
              Save
            </button>
          ) : (
            <button onClick={addFamily} type="button" className="add-btn">
              Add
            </button>
          )}
        </form>
      </Modal>

      <Modal isOpen={isConfirmModalOpen} onClose={cancelDelete}>
        <div className="confirm-delete-modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this family?</p>
          <div className="confirm-delete-actions">
            <button onClick={() => deleteFamily(familyToDelete.id)} className="confirm-btn">
              Yes, Delete
            </button>
            <button onClick={cancelDelete} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FamilyManagement;
