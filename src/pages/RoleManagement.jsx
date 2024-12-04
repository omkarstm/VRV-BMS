import React, { useState } from 'react';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import {
  handleInputChange,
  handlePermissionToggle,
  addRole,
  saveRole,
  deleteRole,
} from '../utils/Roles';
import { saveRolesToStorage } from '../utils/storageUtils';

const RoleManagement = ({ roles, setRoles }) => {
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const permissionsList = [
    'Role',
    'Staff',
    'Family',
    'FamilyProfile',
    'StaffProfile',
    'Dashboard',
  ];

  // Dynamically filter permissions based on the role name
  const filteredPermissionsList =
    newRole.name.toLowerCase() === 'admin' || newRole.name.toLowerCase() === 'moderator'
      ? permissionsList.filter(
          (permission) => !['FamilyProfile', 'StaffProfile'].includes(permission)
        )
      : permissionsList;

  const openAddRoleModal = () => {
    setEditingRole(null);
    setNewRole({ name: '', permissions: [] });
    setIsModalOpen(true);
  };

  const editRole = (role) => {
    setEditingRole(role.id);
    setNewRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      deleteRole(roleToDelete.id, roles, setRoles, saveRolesToStorage);
      setRoleToDelete(null);
    }
    setIsConfirmModalOpen(false);
    window.location.reload();
  };

  const cancelDelete = () => {
    setRoleToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const validateRole = () => {
    if (!newRole.name.trim()) {
      alert("Role Name is required.");
      return false;
    }
    if (newRole.permissions.length === 0) {
      alert("At least one permission must be selected.");
      return false;
    }
    return true;
  };

  const columns = [
    { key: 'name', label: 'Role Name' },
    {
      key: 'permissions',
      label: 'Management Access',
      render: (permissions) => (
        <div className="permissions-container">
          {permissions.map((permission, index) => (
            <span key={index} className={`permission-badge ${permission}`}>
              {permission}
            </span>
          ))}
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: <FiEdit />,
      callback: editRole,
      className: 'edit-btn',
    },
    {
      label: <RiDeleteBin4Line />,
      callback: handleDeleteClick,
      className: 'delete-btn',
    },
  ];

  return (
    <div className="role-management">
      <div className="role-header">
        <h1>Role Management</h1>
        <button onClick={openAddRoleModal} className="add-btn">
          Add Role
        </button>
      </div>
      <div style={{ width: "100%", overflow: "scroll" }}>
        <Table data={roles} columns={columns} actions={actions} />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="add-role-form">
          <h2>{editingRole ? 'Edit Role' : 'Add Role'}</h2>
          <Input
            type="text"
            name="name"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => handleInputChange(e, setNewRole)}
            label="Role Name"
          />
          <div className="permissions">
            {filteredPermissionsList.map((permission) => (
              <label key={permission}>
                <input
                  type="checkbox"
                  checked={newRole.permissions.includes(permission)}
                  onChange={() => handlePermissionToggle(permission, setNewRole)}
                />
                {permission}
              </label>
            ))}
          </div>
          {editingRole ? (
            <button
              onClick={() => {
                if (validateRole()) {
                  saveRole(
                    editingRole,
                    newRole,
                    roles,
                    setRoles,
                    saveRolesToStorage,
                    setEditingRole,
                    setNewRole,
                    setIsModalOpen
                  );
                }
              }}
              className="save-btn"
              type="button"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                if (validateRole()) {
                  addRole(
                    newRole,
                    roles,
                    setRoles,
                    saveRolesToStorage,
                    setNewRole,
                    setIsModalOpen
                  );
                }
              }}
              type="submit"
              className="add-btn"
            >
              Add
            </button>
          )}
        </form>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal isOpen={isConfirmModalOpen} onClose={cancelDelete}>
        <div className="confirm-delete-modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this role?</p>
          <div className="confirm-delete-actions">
            <button onClick={confirmDelete} className="confirm-btn">
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

export default RoleManagement;
