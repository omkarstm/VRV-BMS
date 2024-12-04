import React, { useEffect, useState } from 'react';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Dropdown from '../components/ui/Dropdown'; 
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { getUsersFromStorage, saveUsersToStorage } from '../utils/storageUtils';

const UserManagement = ({ users, setUsers, roles }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const openAddUserModal = () => {
    setEditingUser(null);
    setNewUser({ name: '', email: '', role: '', password: '' });
    setIsModalOpen(true);
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      alert('Please fill in all fields.');
      return;
    }
    const updatedUsers = [...users, { id: Date.now(), ...newUser }];
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
    setNewUser({ name: '', email: '', role: '', password: '' });
    setIsModalOpen(false);
  };

  const editUser = (user) => {
    setEditingUser(user.id);
    setNewUser({ ...user });
    setIsModalOpen(true);
  };

  const saveUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser ? { ...user, ...newUser } : user 
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
    setEditingUser(null);
    setNewUser({ name: '', email: '', role: '', password: '' });
    setIsModalOpen(false);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      saveUsersToStorage(updatedUsers);
      setUserToDelete(null);
    }
    setIsConfirmModalOpen(false);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const handleRoleSelect = (selectedRole) => {
    setNewUser((prev) => ({ ...prev, role: selectedRole }));
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  const actions = [
    {
      label: <FiEdit />,
      callback: editUser,
      className: 'edit-btn',
    },
    {
      label: <RiDeleteBin4Line />,
      callback: handleDeleteClick,
      className: 'delete-btn',
    },
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData) {
      setLoggedInUser(userData);
      console.log("jkxfb",userData)
    }},[])
  return (
    <div className="user-management">
      <div className="user-header">
        <h1>User Management</h1>
        <button onClick={openAddUserModal} className="add-btn">
          Add User
        </button>
      </div>
      <Table data={users} columns={columns} actions={actions} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="add-user-form">
          <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
          <Input
            type="text"
            name="name"
            placeholder="User Name"
            value={newUser.name}
            onChange={handleInputChange}
            label="Name"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            label="Email"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
            label="Password"
          />
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <Dropdown
              options={roles.map((role) => role.name)}
              selected={newUser.role}
              onSelect={handleRoleSelect}
              placeholder="Select Role"
            />
          </div>
          {editingUser ? (
            <button onClick={saveUser} className="save-btn" type="button">
              Save
            </button>
          ) : (
            <button onClick={addUser} type="button" className="add-btn">
              Add
            </button>
          )}
        </form>
      </Modal>

      <Modal isOpen={isConfirmModalOpen} onClose={cancelDelete}>
        {
          loggedInUser && loggedInUser.role !== "Admin" ? <p>Only Admin Can Delete User.</p>:  <div className="confirm-delete-modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className="confirm-delete-actions">
            <button onClick={confirmDelete} className="confirm-btn">
              Yes, Delete
            </button>
            <button onClick={cancelDelete} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
        }
      
      </Modal>
    </div>
  );
};

export default UserManagement;
